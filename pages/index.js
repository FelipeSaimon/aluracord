import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';
import appConfig from  '../config.json';
import { useRouter } from 'next/router'

//isso é um componente react - uma função que retorna um trecho html
function GlobalStyle() {
    return (
      <style global jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          list-style: none;
        }
        body {
          font-family: 'Open Sans', sans-serif;
        }
        /* App fit Height */ 
        html, body, #__next {
          min-height: 100vh;
          display: flex;
          flex: 1;
        }
        #__next {
          flex: 1;
        }
        #__next > * {
          flex: 1;
        }
        /* ./App fit Height */ 
      `}</style>
    );
  }


//Props nesse caso retorna um objeto então é preciso tratar o filho
//assim, para inserir em uma tag utiliza chaves {}
function Title(props){
    const Tag = props.Tag || 'h1'
    return(
    <>
        <Tag>{props.children}</Tag>
        <style jsx>{`
            ${Tag} {
                color: ${appConfig.theme.colors.neutrals['150']};
            }
        `}</style>
 
    </>
    );
}


/*function HomePage() {
    //Elementos JSX
   
    //o style CSS em js tem diferente o jsx em sua config
    return( 
    <div>
        <GlobalStyle />
        <Title>Boas vindas de volta!</Title>
        <h3>Aluracord - Alura Matrix</h3>


    </div>
    
    )
}
  
export default HomePage*/

export default function PaginaInicial() {
    //const username = 'FelipeSaimon';
    /*o setUsername altera o estado atual do navegador */
    const [username, setUsername] = React.useState(''); //State o React (atualiza a tela a cada digitação (estado))
    const roteamento = useRouter();

    console.log('UseState', username)
    return (
      <>
        <GlobalStyle />
        <Box
          styleSheet={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: appConfig.theme.colors.primary[500],
            backgroundImage: 'url(https://observatoriodocinema.uol.com.br/wp-content/uploads/2020/04/Alvin-e-os-Esquilos.jpg)',
            backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
          }}
        >
          <Box
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
              width: '100%', maxWidth: '700px',
              borderRadius: '5px', padding: '32px', margin: '16px',
              boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
              backgroundColor: appConfig.theme.colors.neutrals[700],
            }}
          >
            {/* Formulário */}
            <Box
              as="form"

              onSubmit={function(event){
                event.preventDefault();
                console.log('Submetido')
                roteamento.push('/chat')
                //Jeito mais cru e tradicional de pular pags
                //Mas ele recarrega a tela
                //window.location.href = '/chat'
              }}

              styleSheet={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
              }}
            >
              <title tag="h2">Boas vindas de volta!</title>
              <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
                {appConfig.name}
              </Text>
  
              {/*No react quando voce insere o atributo
              value, ele para de funcionar (o input) ja que
              o react trabalha com estados*/}

              {/* <input 
                type="text" 
                value={username}

                  //Primeiro param é o evento de digitar do usuario
                  //para pegar o valor do event é preciso pegar o target (elemento) => valor do elemento
                  onChange={function evento(event){
                    console.log('usuario digitou', event.target.value)
                    // Onde está o valor 
                    const valor = event.target.value;
                    // Trocar o valor da variável 'username'
                    setUsername(valor);



                  }}             
                /> */}
              {<TextField
                value={username}
                //Primeiro param é o evento de digitar do usuario
                //para pegar o valor do event é preciso pegar o target (elemento) => valor do elemento
                onChange={function evento(event){
                  console.log('usuario digitou', event.target.value)
                  // Onde está o valor 
                  const valor = event.target.value;
                  // Trocar o valor da variável 'username'
                  setUsername(valor);
                 }}

                fullWidth
                textFieldColors={{
                  neutral: {
                    textColor: appConfig.theme.colors.neutrals[200],
                    mainColor: appConfig.theme.colors.neutrals[900],
                    mainColorHighlight: appConfig.theme.colors.primary[500],
                    backgroundColor: appConfig.theme.colors.neutrals[800],
                  },
                }}
              />}
              <Button
                type='submit'
                label='Entrar'
                fullWidth
                buttonColors={{
                  contrastColor: appConfig.theme.colors.neutrals["000"],
                  mainColor: appConfig.theme.colors.primary[500],
                  mainColorLight: appConfig.theme.colors.primary[400],
                  mainColorStrong: appConfig.theme.colors.primary[600],
                }}
              />
            </Box>
            {/* Formulário */}
  
  
            {/* Photo Area */}
            <Box
              styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '200px',
                padding: '16px',
                backgroundColor: appConfig.theme.colors.neutrals[800],
                border: '1px solid',
                borderColor: appConfig.theme.colors.neutrals[999],
                borderRadius: '10px',
                flex: 1,
                minHeight: '240px',
              }}
            >
              <Image
                styleSheet={{
                  borderRadius: '50%',
                  marginBottom: '16px',
                }}
                src={`https://github.com/${username}.png`}
              />
              <Text
                variant="body4"
                styleSheet={{
                  color: appConfig.theme.colors.neutrals[200],
                  backgroundColor: appConfig.theme.colors.neutrals[900],
                  padding: '3px 10px',
                  borderRadius: '1000px'
                }}
              >
                {username}
              </Text>
            </Box>
            {/* Photo Area */}
          </Box>
        </Box>
      </>
    );
  }