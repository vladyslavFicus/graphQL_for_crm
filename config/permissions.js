const config = require('config');
const { Kafka } = require('kafkajs');
const yaml = require('yaml');
const fs = require('fs');
const Zookeeper = require('@hrzn/zookeeper2');
const Logger = require('../src/lib/Logger');
const mapZookeeperPermissionsConfig = require('./utils/mapZookeeperPermissionsConfig');

/**
 * Send default service permissions to kafka
 *
 * @return {Promise<void>}
 */
async function send() {
  // Need to cost optimization for dev/qa/stage envs
  const PREFIX = config.get('prefix');

  const TOPIC = `${PREFIX}service_permissions_event`;

  Logger.info('✈️  Send permission configuration...');

  // Parse default permissions from .yml file
  const permissionConfig = yaml.parse(
    fs.readFileSync(`${__dirname}/permissions.yml`, 'utf-8'),
    { maxAliasCount: -1 },
  );

  // Adding "backoffice-graphql" prefix for each action
  permissionConfig.permissions.actions.forEach((action) => {
    action.action = `${config.name}.${action.action}`;
  });

  // Init kafka producer
  const kafka = new Kafka({
    clientId: config.name,
    brokers: config.kafka.address.split(','),
  });

  const producer = kafka.producer();

  await producer.connect();

  // Construct message to kafka topic
  const value = JSON.stringify({
    service: config.name,
    actions: permissionConfig.permissions.actions,
  });

  // Send message to kafka topic
  await producer.send({
    topic: TOPIC,
    messages: [{ value }],
  });

  Logger.info('✅ Permission configuration sent successfully');
}

/**
 * Assign permissions object to config
 *
 * @param permissions
 */
function assignToConfig(permissions) {
  Object.assign(config, mapZookeeperPermissionsConfig(permissions));
}

/**
 * Load permission configuration from Zookeeper
 *
 * @return {Promise<void>}
 */
async function load() {
  // Need to cost optimization for dev/qa/stage envs
  const PREFIX = config.get('prefix');

  const PERMISSIONS_NODE = `/${PREFIX}permissions`;
  const LAST_UPDATED_PERMISSIONS_NODE = `/${PREFIX}__last_updated_permissions`;

  Logger.info('⏳ Permissions configuration loading...');

  const zookeeper = new Zookeeper({
    host: config.zookeeper,
    logger: Logger,
  });

  // Get and assign brands to config
  assignToConfig(await zookeeper.get(PERMISSIONS_NODE));

  // Add watcher to listen changes in /__last_updated_permissions node and assign updated permissions to config
  zookeeper.watch(LAST_UPDATED_PERMISSIONS_NODE, async () => {
    assignToConfig(await zookeeper.get(PERMISSIONS_NODE));

    Logger.info('✅ Permissions configuration updated successfully');
  });

  Logger.info('✅ Permissions configuration loaded successfully');
}

module.exports = { send, load };
