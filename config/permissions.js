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
  Logger.info('✈️  Send permission configuration...');

  // Parse default permissions from .yml file
  const permissionConfig = yaml.parse(fs.readFileSync(`${__dirname}/permissions.yml`, 'utf-8'));

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
    topic: 'service_permissions_event',
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
  Logger.info('⏳ Permissions configuration loading...');

  const zookeeper = new Zookeeper({
    host: config.zookeeper,
    logger: Logger,
  });

  // Get and assign brands to config
  assignToConfig(await zookeeper.get('/permissions'));

  // Add watcher to listen changes in /__last_updated_permissions node and assign updated permissions to config
  zookeeper.watch('/__last_updated_permissions', async () => {
    assignToConfig(await zookeeper.get('/brands'));

    Logger.info('✅ Permissions configuration updated successfully');
  });

  Logger.info('✅ Permissions configuration loaded successfully');
}

module.exports = { send, load };
