$ErrorActionPreference = 'Stop'

$gitDirectory = & git rev-parse --git-dir 2>$null

if ($LASTEXITCODE -ne 0) {
    exit 0
}

& git config core.hooksPath .githooks

if ($LASTEXITCODE -ne 0) {
    exit ($LASTEXITCODE ?? 1)
}
