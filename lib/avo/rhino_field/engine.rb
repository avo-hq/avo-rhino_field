module Avo
  module RhinoField
    class Engine < Rails::Engine
      isolate_namespace Avo::RhinoField

      initializer "avo-rhino_field.init" do |app|
        ActiveSupport.on_load(:avo_boot) do
          Avo.plugin_manager.register Avo::RhinoField::Plugin
          Avo.plugin_manager.register_field :rhino, Avo::Fields::RhinoField

          Avo.asset_manager.add_stylesheet "avo-rhino_field"
          Avo.asset_manager.add_javascript "avo-rhino_field"
        end

        app.config.assets.paths << root.join("app", "assets", "svgs", "avo")
        app.config.assets.precompile += %w(avo-rhino_field.css avo-rhino_field.js)
        app.config.assets.precompile << '*.svg'
      end
    end
  end
end
