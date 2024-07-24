import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

type methodOptions = 'get' | 'post' | 'patch' | 'delete';

type dataType = {
  [key:string]: any
}

const mockServer = setupServer();

function mockAPI(
  method: methodOptions,
  path:string,
  data: dataType,
  status:number = 200
) {

mockServer.use(http[method](path, ({request}) => {
    // Added lines 24-27 to remove stderror from msw for redundent query-parameters
    // being present in the passed in path parameter. These queries aren't
    // really relied on in the return value because the return data is already
    // mocked according to the passed in query.
    const url = new URL(request.url);

    const nameLike = url.searchParams.get('nameLike');
    const title = url.searchParams.get('title');

    return HttpResponse.json(data, {status: status})
    })
  )
}

export {mockAPI, mockServer};