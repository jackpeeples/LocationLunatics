CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags "-s -w" -o locations.bin cmd/locations/*.go
