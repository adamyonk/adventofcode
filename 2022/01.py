import os
import sys

path = os.path.abspath(sys.argv[0])
input_path = (
    os.path.dirname(path)
    + "/input/"
    + str(int(os.path.basename(path).split(".")[0]))
    + ".input"
)

with open(input_path) as file:
    input = file.read().strip()
    elves = list(
        map(
            lambda e: sum(list(map(lambda s: int(s), e.split("\n")))),
            input.split("\n\n"),
        )
    )
    elves.sort(reverse=True)
    print(elves[0])
    print(sum(elves[:3]))
