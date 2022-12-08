require "pathname"

path = Pathname.new __FILE__
inputPath =
  Pathname.new File.dirname(path) + "/input/" +
                 File.basename(path).split(".")[0].to_i.to_s + ".input"
input = File.read(inputPath)

elves =
  input
    .split("\n\n")
    .map { |string| string.split("\n").map(&:to_i).sum }
    .sort
    .reverse
puts elves[0]
puts elves[0...3].sum
