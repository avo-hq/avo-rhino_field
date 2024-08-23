require_relative "fields/rhino_field"

module Avo
  module RhinoField
    class Plugin < Avo::Plugin
      class << self
        def boot
          Avo.plugin_manager.register_field :rhino, Avo::Fields::RhinoField

          Avo.asset_manager.add_stylesheet "avo-rhino_field"
          Avo.asset_manager.add_javascript "avo-rhino_field"
        end

        def init
        end
      end
    end
  end
end
