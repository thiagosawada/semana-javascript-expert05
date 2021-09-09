import { logger } from "./logger.js";

export default class Routes {
  io;
  constructor() {

  }

  setSocketInstance(io) {
    this.io = io;
  }

  async defaultRoute(request, response) {
    response.end("Hello World");
  }

  // Enviado pelo navegador pra saber se a api está de pé
  async options(request, response) {
    response.writeHead(204);
    response.end();
  }

  async post(request, response) {
    logger.info("post");
    response.end();
  }

  async get(request, response) {
    logger.info("get");
    response.end();
  }

  async handler(request, response) {
    // Liberar o cors
    response.setHeader("Access-Control-Allow-Origin", "*");

    // POST, GET
    const chosen = this[request.method.toLowerCase()] || this.defaultRoute;

    // Apply equivale a chosen(). A diferença é a atribuição do this, que se refere a toda a classe. O segundo parâmetro é o array de argumentos.
    return chosen.apply(this, [request, response]);
  }
}