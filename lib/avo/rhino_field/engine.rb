module Avo
  module RhinoField
    class Engine < Rails::Engine
      isolate_namespace Avo::RhinoField

      initializer "avo-rhino_field.init" do |app|
        if defined?(Avo)
          Avo.plugin_manager.register Avo::RhinoField::Plugin
        end

        app.config.assets.paths << root.join("app", "assets", "svgs", "avo")
        app.config.assets.precompile += %w(avo-rhino_field.css rhino_field.js *.svg)
      end
    end
  end
end
