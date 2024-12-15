# Cyberiada

## About

Cybariada is an idle management game, heavily inspired by [Bitburner](https://github.com/bitburner-official/bitburner-src), in which player controls mainframe and group of up to 10 mercenaries to establish private security company. Player visits different cities, which cover different scenarios, and by working for various factions unlocks new features. Mainframe provides various support buffs, performs hacking and automates gameplay while mercenaries perform sidejobs, contracts and operations.

Cyberiada is currenly under development. It has roadmap available but info here may be outdated.

Discord for discussions and feedback is available here: https://discord.gg/CmsTxU2EMw

## Local development and contribution

Currently, game doesn't have development page but it can be ran locally. To start development server, install dependencies first by running this command:

```
npm i
```

and then run following command in console:

```
npm run dev
```

Game uses [Lit](https://github.com/lit/lit) and [Shoelace](https://github.com/shoelace-style/shoelace) for frontend. Unit tests for state and UI are planned but currently on hold.

Before commiting changes, run following commands to fix formatting and find linting issues:

```
npm run wca
npm run prettier
npm run lint
```
