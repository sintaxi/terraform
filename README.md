# harp-processor

Pre-processor for the Harp APF.


## Usage

Returns the output path.

    processor.outputName(sourcePath)

Simply pass in the path to the source file and you get your output. No fuss.

    processor.process(sourcePath, function(error, contents){
  
    })