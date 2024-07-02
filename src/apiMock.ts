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
    return HttpResponse.json(data, {status: status})
    })
  )
}

export {mockAPI, mockServer};