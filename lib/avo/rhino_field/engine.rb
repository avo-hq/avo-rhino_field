require_relative "fields/rhino_field"

module Avo
  module RhinoField
    class Engine < Rails::Engine
      isolate_namespace Avo::RhinoField

      initializer "avo.assets" do |app|
        if app.config.respond_to?(:assets)
          if defined?(Sprockets)
            app.config.assets.precompile += %w[avo-rhino_field_manifest.js]
          end
        end
      end

      initializer "avo-rhino_field.init" do |app|
        ActiveSupport.on_load(:avo_boot) do
          Avo.plugin_manager.register :rhino

          Avo.plugin_manager.register_field :rhino, Avo::RhinoField::Fields::RhinoField

          Avo.asset_manager.add_stylesheet "avo-rhino_field/application"
          Avo.asset_manager.add_javascript "avo-rhino_field/application"
        end
      end
    end
  end
end
