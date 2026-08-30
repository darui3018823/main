$ErrorActionPreference = 'Stop'

function Invoke-CheckedCommand {
    param (
        [string]$Command,
        [string[]]$Arguments
    )

    & $Command @Arguments

    if ($LASTEXITCODE -ne 0) {
        exit ($LASTEXITCODE ?? 1)
    }
}

function Assert-GeneratedOutputIsCurrent {
    param (
        [string]$Path
    )

    & git diff --quiet HEAD -- $Path
    $diffExitCode = $LASTEXITCODE

    if ($diffExitCode -eq 0) {
        return
    }

    if ($diffExitCode -eq 1) {
        Write-Host "Generated output is stale: $Path" -ForegroundColor Red
        Write-Host "Run the relevant build command and commit $Path before pushing." -ForegroundColor Red
    } else {
        Write-Host "Could not verify generated output: $Path" -ForegroundColor Red
    }

    exit 1
}

Invoke-CheckedCommand 'pnpm' @('lint')

Invoke-CheckedCommand 'pnpm' @('css', 'build')
Assert-GeneratedOutputIsCurrent 'dist/output.css'

Write-Host 'All pre-push checks passed.'
