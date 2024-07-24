// This done here will be available in all test files.
import { expect, afterEach } from "vitest";
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
// import '@testing-library/jest-dom';
// Have extending the matchers on the expect from vitest, but intellisense does
// not recognize the extended matchers UNLESS line 5 is uncommented. BUT this
// results in a ReferenceError when the tests are ran, saying 'expect' is not
// defined and references a line in a code buried within the jest-dom library.

expect.extend(matchers);
afterEach(cleanup);