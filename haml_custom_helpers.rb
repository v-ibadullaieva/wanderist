module HamlCustomHelpers
	def render(filename)
		contents = File.read("views/#{filename}.haml")
		Haml::Engine.new(contents).render
	end
end

::Haml::Helpers.include HamlCustomHelpers
