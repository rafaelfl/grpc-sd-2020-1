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
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition).car;

// criação de um objeto cliente que se conecta ao serviço no
// endereço 127.0.0.1, na porta 50051 e sem segurança
const client = new protoDescriptor.ServicoCarro('127.0.0.1:50051',
                                    grpc.credentials.createInsecure());


// cliente chama o procedimento remoto "RegistrarCarro", passando
// um carro como parâmetro. Ao receber o resultado, uma função de
// callback é executada
client.RegistrarCarro({modelo: "versa", marca: "nissan", cor: "cinza"}, function(err, response) {
    // verifica se ocorreu algum erro na comunicação
    if (err != null) {
        console.log("Ocorreu um erro invocando o procedimento RegistrarCarro");
        return;
    }

    console.log("Versa registrado com sucesso");

    // cliente chama o procedimento remoto "RegistrarCarro", passando
    // um carro como parâmetro. Ao receber o resultado, uma função de
    // callback é executada
    client.RegistrarCarro({modelo: "gol", marca: "volkswagen", cor: "vermelho"}, function(err, response) {
        // verifica se ocorreu algum erro na comunicação
        if (err != null) {
            console.log("Ocorreu um erro invocando o procedimento RegistrarCarro");
            return;
        }

        console.log("Gol registrado com sucesso");

        // cliente chama o procedimento remoto "ListarCarros", sem parâmetros
        // e obtêm a lista de carros como resultado
        client.ListarCarros({}, function(err, response) {
            const lista = response.carros;

            console.log(lista);
        });

    });
});

client.ListarCarros({}, function(err, response) {
    if (err != null) {
        console.log("Ocorreu um erro invocando o procedimento ListarCarros");
        return;
    }

    console.log(" >>>>> Lista de carros: " + JSON.stringify(response.carros) );
});

