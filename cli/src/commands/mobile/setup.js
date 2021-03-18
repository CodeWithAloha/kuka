const { spawnProgress } = require('../../tools/spawn')
const { p, heading, kukaHeading, warning, command, direction } = require('../../tools/pretty')
const DEFAULT_SETUP_OPTIONS = {
  isPodInstalled: false,
  isWindows: false,
}
const setup = async (toolbox, location, options = DEFAULT_SETUP_OPTIONS) => {
  const { print, filesystem, system } = toolbox
  const timer = system.startTimer()
  // System Information
  const { isPodInstalled, isWindows } = options
  // Pretty Printing
  const { colors } = print
  const { bold, blue } = colors
  // Command Options
  const cwd = location

  // Let's GO!
  p()
  p()
  kukaHeading()
  p(bold('Setting up "KukaNow Mobile Application"'))
  p(`🧶 Installing dependencies`)
  await spawnProgress('yarn install', {cwd})
  p(`☕️ Baking CocoaPods`)
  await spawnProgress("npx pod-install", {cwd})
  if (!isWindows && !isPodInstalled) {
    warning('CocoaPods is not installed. Please go to ')
  }
  if (!filesystem.exists(`${location}/.env`)) {
    await filesystem.copy(`${location}/.env.template`, `${location}/.env`)
  } else {
    warning(`.env already exists. Please manually update it or copy over it yourself`)
  }
  p()
  p()
  heading(`${blue("KukaNow CLI")} completed setup in ${bold(`${timer()}ms`)}`)
  p()
  direction(`To get started:`)
  if (isWindows) {
    command(`  yarn android`)
  } else {
    command(`  yarn ios`)
  }
}
module.exports = {
  name: 'setup',
  run: async toolbox => {
    const { system, filesystem, print } = toolbox
    // Paths
    const MOBILE_PATH_BASE =  `${filesystem.cwd()}/../KukaApp`
    // System Information
    const isPodInstalled = system.which('pod').length > 2
    const isWindows = process.platform === "win32"
    await setup(toolbox, MOBILE_PATH_BASE, {isPodInstalled, isWindows})
  }
}

