$:.push File.expand_path("lib", __dir__)

require "avo/rhino_field/version"

Gem::Specification.new do |spec|
  spec.name = "avo-rhino_field"
  spec.version = Avo::RhinoField::VERSION
  spec.summary = "rhino field for Avo."
  spec.description = "rhino field for Avo."
  spec.authors = ["Adrian Marin"]
  spec.email = "adrian@adrianthedev.com"

  spec.files = Dir.chdir(File.expand_path(__dir__)) do
    Dir["{app,lib}/**/*", "Rakefile", "README.md", "avo-rhino_field.gemspec"]
  end
  spec.files.reject! { |file_name| %w[app/javascript].any? { |rejected_file| file_name.include? rejected_file } }

  spec.homepage = "https://avohq.io"
end
