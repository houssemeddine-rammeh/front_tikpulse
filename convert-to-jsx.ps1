# Convert TypeScript to JSX script
Get-ChildItem src -Recurse -Include "*.jsx","*.js" | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    
    # Remove React.FC type annotations
    $content = $content -replace ': React\.FC[^=]*=', ' ='
    
    # Remove type annotations in function parameters
    $content = $content -replace '\(([^:)]+): [^)]+\)', '($1)'
    
    # Remove interface declarations (multi-line)
    $content = $content -replace '(?s)interface\s+\w+[^{]*\{[^}]*\}', ''
    
    # Remove simple type annotations
    $content = $content -replace ': \w+(\[\])?(?=\s*[,;)])', ''
    
    # Remove 'as Type' casting
    $content = $content -replace '\s+as\s+\w+', ''
    
    # Remove optional parameter markers
    $content = $content -replace '\?:', ':'
    
    Set-Content $_.FullName $content
    Write-Host "Converted: $($_.Name)"
} 