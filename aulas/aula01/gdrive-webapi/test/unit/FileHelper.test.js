import {
  jest,
  describe,
  test,
  expect,
} from "@jest/globals";

import fs from "fs";
import FileHelper from "../../src/FileHelper.js";

import Routes from "./../../src/routes.js";

describe("#FileHelper", () => {
  describe("#getFilesStatus", () => {
    test("it should return files statuses in correct format", async () => {
      const statMock = {
        dev: 2049,
        mode: 33204,
        nlink: 1,
        uid: 1000,
        gid: 1000,
        rdev: 0,
        blksize: 4096,
        ino: 28846671,
        size: 327458,
        blocks: 640,
        atimeMs: 1631228186304.7327,
        mtimeMs: 1631228185480.8076,
        ctimeMs: 1631228185484.8071,
        birthtimeMs: 1631228185468.8086,
        atime: "2021-09-09T22:56:26.305Z",
        mtime: "2021-09-09T22:56:25.481Z",
        ctime: "2021-09-09T22:56:25.485Z",
        birthtime: "2021-09-09T22:56:25.469Z",
      }

      const userMock = "thiagosawada";
      process.env.USER = userMock;
      const filename = "file.png";

      // Receber a informação unitária do "arquivo"
      jest.spyOn(fs.promises, fs.promises.stat.name)
        .mockResolvedValue(statMock);

      // Receber um array de nomes de arquivos e pastas
      jest.spyOn(fs.promises, fs.promises.readdir.name)
        .mockResolvedValue([filename]);

      // Se não houvesse o spyOn, o teste buscaria a pasta /tmp do sistema operacional
      const result = await FileHelper.getFilesStatus("/tmp");
      const expectedResult = [
        {
          size: "327 kB",
          lastModified: statMock.birthtime,
          owner: userMock,
          file: filename,
        }
      ];

      expect(fs.promises.stat).toHaveBeenCalledWith(`/tmp/${filename}`);
      expect(result).toMatchObject(expectedResult);
    });
  });
});