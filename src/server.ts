import express from 'express';
import bodyParser from 'body-parser';
import { filterImageFromURL, deleteLocalFiles } from './util/util';
const url = require('url');

(async () => {
  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  app.get('/filteredimage', async (req, res) => {
    const imageUrl = req.query.image_url;
    let imageFilePath: string;

    if (!imageUrl) {
      return res.status(400).send('Please provide an url for the image');
    }

    try {
      const checkedUrl = new URL(imageUrl);
      if (!['http:', 'https:', 'ftp:', 'ipfs:'].includes(checkedUrl.protocol)) {
        throw Error(`${checkedUrl}`);
      }

      if (
        !['jpg', 'jpeg', 'png', 'bmp', 'tiff', 'gif'].includes(
          checkedUrl.pathname.split('.')[1]
        )
      ) {
        return res.status(400).send(`Please provide an image`);
      }
    } catch (error) {
      console.log(
        `${Date().toString()}: ${
          error.input || error.message
        } is not a valid url`
      );
      return res
        .status(400)
        .send(`${error.input || error.message} is not a valid url`);
    }

    try {
      imageFilePath = await filterImageFromURL(imageUrl);
      res.sendFile(imageFilePath, {}, (error: Error) => {
        deleteLocalFiles([imageFilePath]);
        if (error) {
          return res.sendStatus(500);
        }
        console.log(
          `${Date().toString()}: sent filtered image of resource: ${imageUrl}`
        );
      });
    } catch (error) {
      res.sendStatus(500);
    }
  });
  //! END @TODO1

  // Root Endpoint
  // Displays a simple message to the user
  app.get('/', async (req, res) => {
    res.send('try GET /filteredimage?image_url={{}}');
  });

  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();
