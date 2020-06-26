const PROTO_PATH = "./car.proto";

const grpc = require('grpc');

const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });

var protoDescriptor = grpc.loadPackageDefinition(packageDefinition).car;

const listaCarros = [];

function listarCarros(call, callback) {
    console.log("Listar Carros!");
    callback(null, {carros: listaCarros})
}

function consultarCarro(call, callback) {
    // console.log("Consultar Carro " + );
    const pos = call.request.posicao;

    callback(null, listaCarros[pos]);
}

function registrarCarro(call, callback) {
    const carro = {
        modelo: call.request.modelo,
        marca: call.request.marca,
        cor: call.request.cor,
    };

    console.log("Registrar Carro: " + JSON.stringify(carro) );
    listaCarros.push(carro);
    callback(null, {})
}


const server = new grpc.Server();

server.addService(protoDescriptor.ServicoCarro.service,
    {
        ListarCarros: listarCarros,
        ConsultarCarro: consultarCarro,
        RegistrarCarro: registrarCarro,
    });

server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
server.start();