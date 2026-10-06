# NeuroConecta — protótipo local e PWA

Portal demonstrativo em português sobre a proposta de integração da linha de cuidado da pessoa com AVC no SUS. Inclui o fluxo em `fluxo-sus.html`, a tela de entrada simulada em `acesso.html`, os passos de instalação em `instalar.html` e os canais fictícios em `contatos.html`.

## Executar localmente

Na pasta do projeto, inicie um servidor estático:

```bash
python3 -m http.server 8080 --bind 0.0.0.0
```

Abra `http://localhost:8080`. Para instalar como PWA em um celular, o site precisa estar acessível por HTTPS; o ZIP aberto diretamente no aparelho não pode ser instalado como aplicativo web.

## Instalar no celular

- **Android/Chrome:** abra o endereço HTTPS, toque no menu do navegador e selecione “Instalar app” ou “Adicionar à tela inicial”.
- **iPhone/Safari:** abra o endereço HTTPS no Safari, toque em Compartilhar e selecione “Adicionar à Tela de Início”.

A página `instalar.html` contém o passo a passo. O link de demonstração do sandbox é temporário; para uso contínuo no celular, publique o site em hospedagem HTTPS estável.

## Recursos e limites

A PWA tem manifesto, ícones próprios e service worker para manter páginas e recursos estáticos disponíveis após a primeira visita. A tela `contatos.html` reúne exemplos fictícios de WhatsApp, Instagram, Facebook, LinkedIn, YouTube e e-mail. Os botões apenas mostram um aviso de demonstração e não abrem perfis ou serviços reais. Substitua identificadores e links pelos canais oficiais autorizados antes de qualquer publicação pública.

O portal também demonstra entradas separadas para instituição e paciente, cadastro de perfis de exemplo e complementação de informações fictícias. Alterações ficam somente na memória do navegador. Este é um protótipo front-end, sem autenticação real, servidor de aplicação, banco de dados, controle efetivo de acesso ou integração com o SUS. Não insira dados reais de pacientes nem use o protótipo para decisões clínicas ou atendimento de urgência. Uma versão operacional exige autenticação e autorização seguras, governança e proteção de dados sensíveis conforme a LGPD, além de validação clínica, jurídica e institucional.
