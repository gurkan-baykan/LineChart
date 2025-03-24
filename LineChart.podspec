require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name            = "LineChart"
  s.version         = package["version"]
  s.summary         = package["description"]
  s.description     = package["description"]
  s.homepage        = package["homepage"]
  s.license         = package["license"]
  s.platforms       = { :ios => '12' }
  s.author          = package["author"]
  s.source          = { :git => package["repository"]["url"], :tag => "#{s.version}" }
  s.requires_arc     = true
  s.swift_version    = '5.0'
  s.source_files    = "ios/RTNLineChart/**/*.{h,m,mm,swift}"

  if respond_to?(:install_modules_dependencies, true)
    install_modules_dependencies(s)
  else
    s.dependency "React-Core"
    s.dependency "DGCharts"
  end
end