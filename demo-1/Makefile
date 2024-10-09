.PHONY: diagram

diagram:
	ditaa diagram --scale 2 -W -A --no-shadows --svg --overwrite
	sed -i '' 's/Courier/Menlo/g' diagram.svg
	sed -i '' 's/ffffff/fd627a/g' diagram.svg
	sed -i '' 's/000000/ffffff/g' diagram.svg
	sed -i '' 's/ffaaaa/fd627a/g' diagram.svg
	sed -i '' 's/5555bb/ffffff/g' diagram.svg
