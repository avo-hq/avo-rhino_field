require "zeitwerk"
require "avo"
require "avo/rhino_field/version"
require "avo/rhino_field/engine"

loader = Zeitwerk::Loader.for_gem_extension(Avo)
loader.setup

module Avo
  module RhinoField
    # Your code goes here...d
  end
end
