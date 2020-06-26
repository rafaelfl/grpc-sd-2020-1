// definição do caminho do arquivo proto
const PROTO_PATH = "./car.proto";

const grpc = require('grpc');

const protoLoader = require('@grpc/proto-loader');

// carregamento do arquivo proto e geração das definições
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });

// carregamento do código do serviço
var protoDescriptor = grpc.loadPackageDefinition(packageDefinition).car;

// "banco de dados" de carros
const listaCarros = [];

// implementação da funcionalidade "ListarCarros"
function listarCarros(call, callback) {
    // retorna resultado para o cliente
    callback(null, {
        carros: listaCarros
    });
}

// implementação da funcionalidade "ConsultarCarro"
function consultarCarro(call, callback) {
    // obtém a posição passada como parâmetro pelo cliente
    const pos = call.request.posicao;

    // retorna resultado para o cliente
    callback(null, listaCarros[pos]);
}

// implementação da funcionalidade "RegistrarCarro"
function registrarCarro(call, callback) {
    // obtém as informações do carro a ser registrado, passado como parâmetro pelo cliente
    const carro = {
        modelo: call.request.modelo,
        marca: call.request.marca,
        cor: call.request.cor,
    };

    // adiciona o objeto carro recebido no "banco de dados"
    listaCarros.push(carro);

    // retorna resultado para o cliente
    callback(null, {})
}

// instancia objeto do servidor
const server = new grpc.Server();

// adiciona as implementações das funções ao serviço exportado de carro
server.addService(protoDescriptor.ServicoCarro.service,
    {
        ListarCarros: listarCarros,
        ConsultarCarro: consultarCarro,
        RegistrarCarro: registrarCarro,
    });

// associa o serviço a todos os endereços e a porta 50051 (sem segurança)
server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());

// inicia o serviço
server.start();