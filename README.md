# Project: Idle Takeover

## About

Project: Idle Takeover is an idle management game, heavily inspired by [Bitburner](https://github.com/bitburner-official/bitburner-src), in which player controls AI on mainframe and group of clones to collect intel. Player visits different cities, which cover different scenarios, and by working for various factions unlocks new features. Mainframe provides various support buffs, performs hacking and automates gameplay while clones perform sidejobs, contracts and operations.

Project: Idle Takeover is currenly under development. It has roadmap available but info here may be outdated.

Discord for discussions and feedback is available here: https://discord.gg/CmsTxU2EMw

## Troubleshooting

#### High memory usage

Disabling popup messages on settings page by setting duration to 0 can reduce memory usage.

#### CPU spikes after setting tab active

After tab is active again, game tries to perform frame updates which didn't happened when tab was inactive. Amount of updates is on settings page, reduce it in case high CPU usage. This parameter is also used by fast forwarding, which runs game at highest speed possible.

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

#### Build preview

To preview game build, run this to build files:

```
npm run build
```

After that, run this to start preview server:

```
npm run preview
```

#### Translations

For translactions, game uses [@lit/localize](https://github.com/Lit/Lit/tree/main/packages/localize). To update localization, first run this:

```
npm run localize:extract
```

Then update xlf file under `src/xliff` directory and after that run this:

```
npm run localize:build
```

### Debugging and balancing CLI tools

#### Unzip savefile

To unzip a savefile, run following command:

```
npm run unzip-savefile -- -i <input file name> -o <output file name>
```

It will unzip savefile `<input file name>` from `cli-data/zipped-saves` and save it in `cli-data/unzipped-saves` as `<output file name>`. Output file name can be ommited, in this case it will be saved as `<input file name>`.

#### Zip savefile

To zip a savefile, run following command:

```
npm run zip-savefile -- -i <input file name> -o <output file name>
```

It will unzip savefile `<input file name>` from `cli-data/unzipped-saves` and save it in `cli-data/zipped-saves` as `<output file name>`. Output file name can be ommited, in this case it will be saved as `<input file name>`.

#### Validate savefile

To validate a savefile, run following command:

```
npm run validate-savefile -- -i <input file name>
```

It will validate savefile `<input file name>` from `cli-data/unzipped-saves`. Savefile data should match schema and all named entities should exist in configs.

#### Simulation tool

To run a simulation, run following command:

```
npm run simulate -- -i <request file name>
```

It will run simulation request from file `<request file name>` from `cli-data/simulation-requests`. Request file schema:

```
{
  "inputSavefile": "<input savefile name>",
  "outputSavefile": "<output savefile name>",
  "snapshotsFile": "<snapshots file name>",
  "time": <time to simulate>,
  "updatesPerTick": <updates per tick>,
  "cooldownTime": <cooldown time>,
  "automation": [
    {
      "type": "<automation type>",
      "timeout": <automation timeout>,
      "startImmediately": <should automation be applied immediately>
    }
  ]
}
```

Perameters:

- `<input savefile name>` - Name of input savefile. Should be located in `cli-data/unzipped-saves`
- `<output savefile name>` - Name of output savefile. Will be located in `cli-data/unzipped-saves`
- `<snapshots file name>` - Name of file with snapshots of game state. Will be located in `cli-data/snapshots`
- `<time to simulate>` - Time to run a simulation in milliseconds
- `<updates per tick>` - Max amount of updates per tick
- `<cooldown time>` - Cooldown time between ticks in milliseconds
- `<automation type>` - Type of automation. Currently supported: `takeSnapshot`, `upgradeMainframePrograms`, `upgradeMainframeHardware`, `upgradeMainframePerformance`, `upgradeMainframeRam`, `upgradeMainframeCores`
- `<automation timeout>` - Timeout between automation usage in milliseconds
- `<startImmediately>` - If `true`, automation will run immediately after starting simulation. Otherwise `false` should be set

#### CSV writer tool

To make a CSV file, run following command:

```
npm run write-csv -- -i <request file name>
```

It will run CSV writing request from file `<request file name>` from `cli-data/csv-requests`. Request file schema:

```
{
  "snapshotsFile": "<snapshots file name>",
  "outputFile": "<output CSV file name>",
  "columns": [
    {
      "id": "<column ID>",
      "title": "<column name>",
      "value": "<column value>"
    }
  ]
}
```

Perameters:

- `<snapshots file name>` - Name of snapshots file. Should be located in `cli-data/snapshots`
- `<output CSV file name>` - Name of output CSV file. Will be located in `cli-data/csv-output`
- `<column ID>` - ID of the column. Each column should have different ID. Cannot be `timestamp`
- `<column name>` - Name of the column in CSV file header
- `<column value>` - Value of the column. Should refer to the correct path from snapshot. Examples: `global.development.points`, `mainframe.programs.ownedPrograms[0].level`
