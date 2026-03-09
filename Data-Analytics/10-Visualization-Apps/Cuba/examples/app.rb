require "cuba"

Cuba.define do
  on root do
    res.write "Hello from Cuba"
  end

  on "hello", param("name") do |name|
    res.write "Hello, #{name}!"
  end
end
