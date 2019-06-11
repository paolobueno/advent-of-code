#! /usr/bin/env julia
A = zeros(Int, 1000, 1000);

# #1 @ 249,597: 20x15
parser = r"@ (\d+),(\d+): (\d+)x(\d+)"

function getClaimArea(horiz, vert, width, height)
  horiz += 1
  vert += 1
  view(A, horiz:(horiz+width-1), vert:(vert+height-1))
end

function paintA!(horiz, vert, width, height)
  b = getClaimArea(horiz, vert, width, height)

  # faster than b .+= 1
  map!(x -> x + 1, b, b)
end

claims = map(readlines()) do l
  m = match(parser, l)
  map(s -> parse(Int, s), m.captures)
end

foreach(c -> paintA!(c...), claims)

claimIdx = findfirst(claims) do claim
  claimArea = getClaimArea(claim...)
  all(claimArea .== 1)
end

# display(A)
println("part1:", count(x -> x > 1, A))
println("part2:", claimIdx)