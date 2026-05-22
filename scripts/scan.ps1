$ErrorActionPreference = "Stop"

$images = @(
  "nginx-site-bind:secure",
  "nginx-site-copy:secure"
)

foreach ($image in $images) {
  Write-Host ""
  Write-Host "Scanning $image with Docker Scout..." -ForegroundColor Cyan
  docker scout cves $image --only-fixed
}

Write-Host ""
Write-Host "Scan finished. If Docker Scout reports 0C 0H 0M 0L, no vulnerable packages were detected." -ForegroundColor Green
