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

mockServer.use(http[method](path, () => {
    // At one point received a remove stderror from msw for redundent
    // query-parameters being present in the passed in path parameter.
    // These queries aren't really relied on in the return value because
    // the return data is already mocked according to the passed in query.
    // At a later time it appears this stderror is no longer occuring, but
    // left this code in case it pop up again.
    // const url = new URL(request.url); // request object needs to be destructured in the param of the arrow function.

    // const nameLike = url.searchParams.get('nameLike');
    // const title = url.searchParams.get('title');

    return HttpResponse.json(data, {status: status})
    })
  )
}

export {mockAPI, mockServer};