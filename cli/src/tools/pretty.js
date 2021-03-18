/**
 * @cite https://github.com/infinitered/ignite/blob/fd42382d8d9588f04c9a5104b702bf12e007536d/src/tools/pretty.ts
 */
const { print } = require("gluegun/print")

const { cyan, gray, white, bold, blue, yellow } = print.colors
const { underline } = print.colors
const p = (m = "") => print.info(gray(`   ${m}`))
const heading = (m = "") => p(white(bold(m)))
const link = (m = "") => underline(white(m))
const kukaHeading = () =>
  p(
    blue(
      bold(
        "· · · · · · · · · · · · · · · · · · KukaNow · · · · · · · · · · · · · · · · · ·\n",
      ),
    ),
  )
const command = (m = "", second = "", examples = []) => {
  p('$ ' + white(m) + "  " + gray(second))
  const indent = m.length + 2
  if (examples) {
    examples.forEach((ex) => p(gray(" ".repeat(indent) + ex)))
  }
}
const direction = (m = "") => p(cyan(m))
const warning = (m = "") => p(yellow(m))

module.exports = {
  p,
  heading,
  link,
  kukaHeading,
  command,
  direction,
  warning
}
