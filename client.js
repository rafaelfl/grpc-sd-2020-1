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

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition).car;


const client = new protoDescriptor.ServicoCarro('localhost:50051',
                                    grpc.credentials.createInsecure());


client.RegistrarCarro({modelo: "versa", marca: "nissan", cor: "cinza"}, function(err, response) {
    if (err != null) {
        console.log("Ocorreu um erro invocando o procedimento RegistrarCarro");
        return;
    }

    console.log("Versa registrado com sucesso");

    client.RegistrarCarro({modelo: "gol", marca: "volkswagen", cor: "vermelho"}, function(err, response) {
        if (err != null) {
            console.log("Ocorreu um erro invocando o procedimento RegistrarCarro");
            return;
        }

        console.log("Gol registrado com sucesso");

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

