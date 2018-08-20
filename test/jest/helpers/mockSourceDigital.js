/* eslint-disable */
/**
 * @jest-environment jsdom
*/

export default SourceDigital = {
  build: {
    time: new Date(),
    target: process.env.SOURCE_ENV,
    version: 133.7,
    for: 'TESTING',
    on: {
      cpu: process.env.PROCESSOR_IDENTIFIER,
      os: process.env.OS,
      node: process.env.npm_config_node_version
    }
  }
}
