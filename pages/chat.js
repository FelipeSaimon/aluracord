import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { useRouter } from 'next/router'
import { createClient } from '@supabase/supabase-js';
import { ButtonSendSticker } from '../src/components/buttonSendSticker'

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzQ2MjIwMywiZXhwIjoxOTU5MDM4MjAzfQ.HeKMfL5xgc1aASWwrrN-W-wM4MaK0GQL0Ap2auVyxWY'
const SUPABASE_URL = 'https://ogcqqwymlrgyecsdaghw.supabase.co'
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

function escutaMsgEmTempoReal() {
    return supabaseClient
        .from('mensagens')
        .on('INSERT', () =>{
            console.log('Nova mensagem capturada')
        })
        .subscribe();
        
}

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

    const roteamento = useRouter();
    const usuarioLogado = roteamento.query.username
    const [mensagem, setMensagem] = React.useState(''); 
    const [ListaMensagens, setListaMensagens] = React.useState([])

    /* Abaixo está sendo feito um debbunging para ver como seria feito o
    codigo para enviar um sticker como gif (exemplo) feito na unha */
    // const [ListaMensagens, setListaMensagens] = React.useState([
    //     {
    //         id: 1,
    //         de: 'FelipeSaimon',
    //         text: ':sticker: http://2.bp.blogspot.com/-d21tffsTIQo/U_H9QjC69gI/AAAAAAAAKqM/wnvOyUr6a_I/s1600/Pikachu%2B2.gif'
    //     }
    // ])

 
    function supabaseMensagens(mensagem){
        supabaseClient
            .from('Mensagens')
            .insert([
                mensagem
            ]).then(({ data }) =>{
                //console.log('Testando', mensagem)

                setListaMensagens([
                    data[0],
                    ...ListaMensagens, //Os 3 pontos indica 'espalhar' os elementos do array, evitando algum conflito de duplicidade
                ])
            })
            setMensagem('')
    }

    React.useEffect(() => {
        supabaseClient
        .from('Mensagens')
        .select('*') 
        .order('id', {ascending: false})
        .then(({ data }) =>{ //O then nesse caso retornará alguns dados da promessa mais legiveis
            //console.log('dados: ',data)
            setListaMensagens(data) // { data } assim extrai diretamente o 'data' dados da api (servidor)
        })

        escutaMsgEmTempoReal();
    }, []) // Para tratar coisas que fogem do padrão em determinado componente
    //O array nesse final indica quando que o supabaseClient irá pegar os dados do servidor de novo, para evitar sobrecarga de dados
        
    function novaMensagem(novaMsg){
        const mensagem = {
            //id: ListaMensagens.length + 1,
            de: usuarioLogado,
            text: novaMsg
        }
        supabaseMensagens(mensagem)
    }

    function RemoveMensagem(messageToDelete){
        let newMessageList = ListaMensagens.filter((mensagem)=>{
            if(mensagem.id !== messageToDelete.id){
                return mensagem
            }
        })

        ListaMensagens(newMessageList)
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
                        {/* CALLBACK - chamada de retorno*/}
                        <ButtonSendSticker
                            onStickerClick={(sticker) => {
                                //console.log('Salva isso na Lista de mensagens')
                                novaMensagem(`:sticker: ${sticker}`) //Basta passar o sticker para a função que monta a mensagem normal
                            }}

                        />
                        
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
                        {/* Botão para enviar mensagem */}
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
    //console.log('MessageList', props.ListaMensagens);
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
                                src={`https://github.com/${mensagem.de}.png`}
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
                                onClick={() => props.onRemove(mensagem)}

                            />
                        </Box>
                            {/*Testando a logica de adicionar gifs/imagens em uma msg no React
                            Nesse caso utilizou-se uma condicional ternaria, uma obsevação é que
                            as estruturas de condicional e repetição tradicional não funcionam dentro
                            do react de forma padrão.*/

                            mensagem.text.startsWith(':sticker:')
                                ? (
                                <Image styleSheet={{maxWidth:'150px'}} src={mensagem.text.replace(':sticker:', '')} />
                                )
                                : (
                                mensagem.text
                            )}
                        {/*mensagem.text*/}
                        
                    </Text>
                )
                
            })}
            
        </Box>
    )
}
