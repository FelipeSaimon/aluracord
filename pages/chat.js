import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';

export default function ChatPage() {
    // Sua lógica vai aqui

    //Usuário
        //O usuário digita no campo textarea
        //Aperta no botão ENTER para enviar a mensagem
        //Adicionar a mensagem a uma listagem de mensagens

    //Desenvolvedor
        //(x)Campo criado (textarea)
        //(x)utilizar um onChange para escutar os eventos de digitação pelo setState(useState)
        //(x)Dar enter para enviar mensage e ao mesmo tempo limpar o campo de textarea
        //()Listar as mensagens


    //Sua lógica vai aqui
    const [mensagem, setMensagem] = React.useState(''); 
    const [ListaMensagens, setListaMensagens] = React.useState([])

    function novaMensagem(novaMsg){
        const mensagem = {
            id: ListaMensagens.length,
            de: 'FelipeSaimon',
            text: novaMsg
        }
        setListaMensagens([
            mensagem,
            ...ListaMensagens, //Os 3 pontos indica 'espalhar' os elementos do array, evitando algum conflito de duplicidade
        ])
        setMensagem('')

    }
    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: 'url(https://observatoriodocinema.uol.com.br/wp-content/uploads/2020/04/Alvin-e-os-Esquilos.jpg)',
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >

                   <MessageList mensagens={ListaMensagens} />

                    {/* Mensagens exibidas: {ListaMensagens.forEach((msgAtual) => {
                        console.log(msgAtual)
                        return(
                            <li>{msgAtual}<li/>
                        )
                    })} */}

                    {/* 
                    Faz a impressão dos elementos na tela
                    {ListaMensagens.map((msgAtual) => {
                        return(
                            //o key={} previne erros com filhos
                            <li key={msgAtual.id}>
                                {msgAtual.image}{msgAtual.de}: {msgAtual.text}
                            </li>  
                        )
                    })} */}

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
 
                        
                        <TextField
                            value={mensagem}
                            //Usei uma arrow function para testar
                            onChange={(e) =>{
                                const msg = e.target.value;
                                setMensagem(msg)
                            }}

                            onKeyPress={(event) => {
                                //console.log(event)
                                if(event.key === 'Enter'){
 
                                    event.preventDefault()
                                    novaMensagem(mensagem);
                                }
                            }}

                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}

                        />
                       <Button iconName="arrowRight" 


                            onChange={(e) =>{
                                const msg = e.target.value;
                                setMensagem(msg)
                            }}

                            onClick={(event) => {
                                event.preventDefault()
                                novaMensagem(mensagem);
                            }}
                            
                            styleSheet={{
                                width: "10%",
                                height: "83%",
                                marginBottom: "7px"
                              }}
                              
                              buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["900"], //cor do texto do botão
                                mainColor: appConfig.theme.colors.primary['050'], //cor principal do botão
                                mainColorLight: appConfig.theme.colors.primary['700'], //esse n sei bem sorry
                                mainColorStrong: appConfig.theme.colors.primary['200'], //cor do hover se n me engano
                              }}
                        />
                        
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    const [excluido, setExcluido] = React.useState('');
    console.log('MessageList', props.ListaMensagens);
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.mensagens.map((mensagem) =>{
                return(
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                            backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                        <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/FelipeSaimon.png`}
                            /> 
                            <Text tag="strong">
                                {mensagem.de}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                            <Button label="apagar" 
                                onClick={(e) =>{
                                        this.mensagem({mensagem: this.mensagem.filter(function(mensagem) { 
                                            return mensagem !== e.target.value 
                                        })});
                                    }
                                }

                                styleSheet={{
                                    width: "10%",
                                    height: "63%",
                                    marginBottom: "4px"
                                  }}
                                  
                                  buttonColors={{
                                    contrastColor: appConfig.theme.colors.neutrals["900"], //cor do texto do botão
                                    mainColor: appConfig.theme.colors.primary['050'], //cor principal do botão
                                    mainColorLight: appConfig.theme.colors.primary['700'], //esse n sei bem sorry
                                    mainColorStrong: appConfig.theme.colors.primary['200'], //cor do hover se n me engano
                                  }}
                            />
                        </Box>
                        {mensagem.text}
                        
                    </Text>
                )
                
            })}
            
        </Box>
    )
}
