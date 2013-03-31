# harp-processor

Pre-processor for the Harp APF.

## API

    processor.outputPath(sourcePath)
    processor.sourcePath(url)
    processor.sourcePathList(url)
    processor.render(sourcePath, callback)
    processor.processFromPath(sourcePath, callback)
    processor.processFromUrl(url, callback)

## Usage

Returns the output path.

    processor.outputPath(sourcePath)

Simply pass in the path to the source file and you get your output. No fuss.

    processor.render(sourcePath, function(error, contents){

    })

A superset of these commands is the `process` method.

    processor.processFromFile(filePath, function(error, reply){
      reply.type
      reply.outputPath
      reply.output

      OR

      error.type
      error.sourcePath
      error.name
      error.message
      error.output

    })

    processor.processFromUrl(urlPath, function(error, reply){
      reply.type
      reply.outputPath
      reply.output

      OR

      error.type
      error.sourcePath
      error.name
      error.message
      error.output
    })





