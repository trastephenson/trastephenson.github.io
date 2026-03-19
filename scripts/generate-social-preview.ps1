Add-Type -AssemblyName System.Drawing

$profilePath = 'D:\Projects\trastephenson.github.io\src\content\profile.json'
$profile = Get-Content $profilePath -Raw -Encoding utf8 | ConvertFrom-Json

$width = 1200
$height = 630
$bitmap = New-Object System.Drawing.Bitmap($width, $height)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

$rect = New-Object System.Drawing.Rectangle(0, 0, $width, $height)
$bgBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
  $rect,
  ([System.Drawing.Color]::FromArgb(255, 246, 240, 231)),
  ([System.Drawing.Color]::FromArgb(255, 233, 224, 208)),
  20
)
$graphics.FillRectangle($bgBrush, $rect)

$accentBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 31, 52, 91))
$softAccentBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(90, 31, 52, 91))
$highlightBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 179, 138, 76))
$panelBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(120, 255, 255, 255))

$graphics.FillEllipse($softAccentBrush, 760, -80, 420, 420)
$graphics.FillEllipse($highlightBrush, 700, 400, 260, 260)
$graphics.FillRectangle($panelBrush, 70, 85, 690, 460)

$sourcePath = 'D:\Projects\trastephenson.github.io\src\assets\me-about.png'
$photo = [System.Drawing.Image]::FromFile($sourcePath)
$photoRect = New-Object System.Drawing.Rectangle(790, 95, 320, 320)
$clipPath = New-Object System.Drawing.Drawing2D.GraphicsPath
$clipPath.AddEllipse($photoRect)
$graphics.SetClip($clipPath)
$graphics.DrawImage($photo, $photoRect)
$graphics.ResetClip()

$photoBorder = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 255, 255, 255), 10)
$graphics.DrawEllipse($photoBorder, $photoRect)

$titleFont = New-Object System.Drawing.Font('Segoe UI Semibold', 34, [System.Drawing.FontStyle]::Bold)
$subtitleFont = New-Object System.Drawing.Font('Segoe UI Semibold', 17, [System.Drawing.FontStyle]::Regular)
$bodyFont = New-Object System.Drawing.Font('Segoe UI', 15.5, [System.Drawing.FontStyle]::Regular)
$tagFont = New-Object System.Drawing.Font('Segoe UI Semibold', 14, [System.Drawing.FontStyle]::Bold)
$urlFont = New-Object System.Drawing.Font('Segoe UI', 16, [System.Drawing.FontStyle]::Regular)

$darkBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 24, 31, 43))
$mutedBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 73, 84, 100))
$whiteBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 255, 255, 255))

$graphics.FillRectangle($accentBrush, 70, 85, 14, 460)
$graphics.DrawString($profile.name.ToUpperInvariant(), $titleFont, $accentBrush, 110, 135)

$heroLines = @($profile.headlineDisplayLines)
$heroY = 205
foreach ($line in $heroLines) {
  $graphics.DrawString($line, $subtitleFont, $darkBrush, 112, $heroY)
  $heroY += 34
}

$tagText = $profile.previewBadge
$tagPaddingX = 16
$tagPaddingY = 10
$tagTextSize = $graphics.MeasureString($tagText, $tagFont)
$tagRect = [System.Drawing.RectangleF]::new(
  [single]112,
  [single]($heroY + 14),
  [single]([Math]::Ceiling($tagTextSize.Width) + ($tagPaddingX * 2)),
  [single]([Math]::Ceiling($tagTextSize.Height) + ($tagPaddingY * 2))
)
$graphics.FillRectangle($accentBrush, $tagRect.X, $tagRect.Y, $tagRect.Width, $tagRect.Height)
$graphics.DrawString($tagText, $tagFont, $whiteBrush, $tagRect.X + $tagPaddingX, $tagRect.Y + $tagPaddingY - 1)

$bodyLines = @($profile.previewBodyLines)
$bodyY = $tagRect.Y + $tagRect.Height + 44
foreach ($line in $bodyLines) {
  $graphics.DrawString($line, $bodyFont, $mutedBrush, 112, $bodyY)
  $bodyY += 31
}

$graphics.DrawString($profile.websiteLabel, $urlFont, $accentBrush, 112, 500)

$outputPath = 'D:\Projects\trastephenson.github.io\public\social-preview.png'
$bitmap.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)

$photo.Dispose()
$titleFont.Dispose()
$subtitleFont.Dispose()
$bodyFont.Dispose()
$tagFont.Dispose()
$urlFont.Dispose()
$darkBrush.Dispose()
$mutedBrush.Dispose()
$whiteBrush.Dispose()
$accentBrush.Dispose()
$softAccentBrush.Dispose()
$highlightBrush.Dispose()
$panelBrush.Dispose()
$photoBorder.Dispose()
$clipPath.Dispose()
$bgBrush.Dispose()
$graphics.Dispose()
$bitmap.Dispose()
