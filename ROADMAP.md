# Description

Cyberiada is an idle cyberpunk-themed RPG inspired by Bitburner. In this game player control team of up to 10 members by giving them various orders to perform. Company can travel between different cities which have different conditions and unique rewards.

# Terms

## Money

Money is a resource which can be spend on performing various actions such as hiring new company members, buying equipment, boosters and augmentations etc.

## Development points

Development points are main resource in the game. It show how much progress is done in particaluar city. Unlocking equipment, boosters, augmentations, works, contracts, missions etc. requires reaching certain levels of respect.

## Development level

Each city has it's own development level. Higher development levels allow purchasing items with higher level. Development level increases after reaching certain development points thresholds. Most cities have upper limit on development level. After relocating development level is reset. Each city has it's own development level factors.

## Favors

Favors are faction-specific currency. Favors are earned by completing missions, capturing more districts, by increasing development level or can be bought by money. Favors can be spent on purchasing faction blueprints, negating prestige effects, decreasing prices or using faction specific perks.

## Qualities and difficulties

Various objects have different quality or difficulty. It's marked as number from I to VII.

## Company

Game revolves around managing company. Company members are managed by giving them orders.

Moving to another city will result in losing current company but certain favors allow to retain company members.

## Company member

Each company member has their own set of attributes, skills, equipment and augmentations. They can be boosted by boosters. Certain actions can kill them. Depending on quality, company members have different starting equipment, augmentations, attributes and skills. Attributes and skills of newhires depend on development level. Each district may unlock new company member template as reward for capturing it.

Company members to be hired are generated depending on templates. There are templates for each faction and for neutral.

## Stats

### Level

Each company member has their own level. Level requirements do not depend on current city or development level and are exponential. Reacing new level gives company member one attribute and one skill points.

### Experience

To get new levels, company members must reach certain thresholds of experience. Experience gain can be increased by increasing intellect and using certain items.

### HP

HP indicates how much damage can company member take. If HP reaches 0 or lower, company member dies, to be removed from company and all actions related to them are cancelled. Can be increased by certain items and endurance.

If company member is not doing anything, they can be healed for some amount of money.

### Damage

Damage is used in combat. Each time someone receives a hit, damage is selected from certain range, reduced by opponent defense and then applied. Damage depends on equipment. Melee equpment damage depends on strength and some skills.

### Critical rate

Each time damage is dealt, it may deal critical hit. Critical rate indicates how often these critical hits happen. Critical rate is converted from hit rate.

### Critical multiplier

Whenever critical hit happens, damage is multiplied by critical multiplier. Multiplier depends on equipment.

### Defense

This parameter reduces all incoming damage. Depends on equipment. Ranged equipment will provide defense.

### Hit number

This parameter affects how many attacks will be dealt per turn. Can be increased by agility.

### Precision

This parameter affects how it's likely to make a hit. It depends on equipment, attributes and skills.

### Dodge

This parameter affects how it's likely to dodge the attack. Can be increased by stealth and agility.

### Regeneration

This parameters affects how fast company member HP will regenerate.

### Experience bonus

This parameter affects how fast company member gets experience.

### Initiative

This parameter affects how soon company member can have their turn in combat.

## Attributes

### Strength

Strength is used mostly in weapon requirements and for damage bonuses for melee weapons.

### Endurance

Endurance affects company member HP and how fast augmentations can be installed in them.

### Perception

Perception is used in determining whether opponent is hit or not.

### Agility

Agility is used for dodging attacks in combat.

### Intellect

Intellect affects how much experience company member gets after completing orders. It also used in weapon requirements, for decreasing search requirements.

### Charisma

Charisma affects sidejobs to generate more connections.

## Skills

### Close combat

Close combat affects damage and critical rate for close combat weapons such as knifes and SMGs.

### Ranged combat

Ranged combat affects critical rate for ranged combat weapons such as assault and sniper rifles.

### Stealth

Stealth is used for dodging attacks.

### Hacking

Hacking is used for hacking and using smart weapons such as combat drones.

### Crafting

Crafting is used for crafting and using complex equipment such as power armor.

### Persuasion

Persuasion gives additional money and respect bonuses.

### Info gathering

Info gathering affects order searching.

## Equipment

Each company member has three different equipment slots: weapon, armor and utility. Weapon equipment deals damage, armor provides defense and utility gives buffs or debuffs. Each equipment item has level and quality. Higher the level or quality, higher the requirements and stats. Changing equipment is not free - it results in short action which will override current member action and cannot be cancellable. Equipment can be bought from weapon shop, be crafted or earned by performing missions and contracts. Equipments can be received by crafting, by shopping or performing contracts and missions. Capturing districts can unlock more equipment.

Equipped items will be lost after moving to another city unless specific favors are earned.

Unlocked in starting town at some point.

## Augmentations

Augmentations are another way to buff company members. Like equipment, each augmentation has level and quality, which affect requirements and stats. Augmentation is not free, each augmentation has time wall to install which can be reduced by endurance.

Each company member has following augmentations slots:

- Skin
- Nerve system
- Eyes
- Head
- Torso
- Arms
- Legs

Augmentations are not affected by moving to another city.

Unlocked in starting town at some point.

## Boosters

Boosters give buffs and debuffs for limited amount of time. Must be applied manually or by automation, application results in short uncancellable action. Each booster has level and quality affecting it's stats.

Unlocked in starting town at some point.

## Inventory

Inventory has equipment and boosters which can be sold for money. Inventory space is limited. After relocating inventory will be emptied.

## Crafting blueprints

Crafting blueprints allows crafting equipment or boosters. Level of resulting item is capped by development level. Quality can be selected and will affect crafting time. Getting blueprints for same item increases max quality with what item can be crafted. Blueprints can be bought by favors.

## City

Each city is described as square map of 100x100 cells. City is divided into districts. Each district can have own set of equipments available for purchase. In addition, each district has it's own set of multipliers, depending on district template and scenario multipliers. Some districts may contrain player or faction HQs.

Each city has it's own line of rewards, each reward requires increasing development level. Player can achieve multiple rewards in same run.

Each city district has it's own set of contract and hire counters. In addition, each district has wanted level and wanted points, job searching points, connections to get more rewards and investigation points. 

### Facilities

Each faction in scenario has it's own line of rewards. Capturing more districts in the city will lead to increasing amount of available facilities or items. For example, capturing 3 districts means first 3 rewards are available. These facilities can be: Weapon shop, pharmacy, hospitals, training facilities, hacking shops and probably more. Rewarded items depend on faction.

Weapon shop, pharmacy, hospitals, training facilities and hacking shops have quality. Shops can sell items limited by quality. Training facilities can increase skill or attribute to level depending on development level and quality. Quality can be increased by purchasing certain faction favor.

Training facilities can increase only one selected attribute or skill. Skill or attribute for training facilities and faction items for other facilities depend on faction.

In addition, districts also reward specific neutral items after capturing it. Rewards are randomized during map generation. Each district can have maximum one of such item.

### Districts

Each district has it's own set of multipliers. These multipliers increase chance of getting contract, increase change of getting mercenary available, increase reputation and money rewards. These multipliers can be increased by specific side jobs and are retained. However, spending more on these multipliers will result in diminishing returns.

When district is captured, it will receive maximal amount of contracts for each contract type and each quality. However, initial chances to get new mercenary or contract are 0. Player must perform specific actions to increase these chances. Play can increase connections for selected district, each 10 minutes accumulated job search points will be used to generate contracts and will be reset. Minimum points of job search points depends on connections.

After generating city, for each district will be assigned faction for combat. If it's same as player faction, neutral faction will be used.

Each district has 2 rewards for capturing it: for neutral faction and player selected factions. These rewards can unlock new equipment, company hires, training programs, etc.

### Factions

Each city has it's own set factions that try to claim city for themself. Player can join one faction if development level requirements are met. Once faction is joined, player cannot leave it unless they relocate.

Each factions has it's own predetermined power level speed, affecting power level of joined faction.

Faction specific equipment, boosters and augmentations can be obtained by capturing districts, getting blueprints or performing contracts and missions. Each faction have one or more perks which can be purchased by favors.

Each faction has it's own set of requirement modifiers, affecting missions and related side jobs and contracts.

### Turf war

Turf war allows factions capture districts depending on faction power level. Depending on what has been captured, faction will receive different bonuses:

- Capturing opposing faction HQ unlocks missions to raid it
- Capturing player HQ gives ability to instantly perform mercenary search by spending money
- Capturing faction HQ gives ability to instantly perform contracts and sidejob search by spending money

Each faction has it's own line of training programs, equipments and augmentations. When game starts, this line is randomized. Capturing districts will make more rewards from this line available.

Capturing districts allows company to perform activities here, buy mercenaries from here and will affect speed of changing power level.

Requirements to capture will increase with each owned distict. Player can assist their selected faction by increase it's power level.

When map is generated, district are split between neutral forces and factions. After joining faction, it's power level starts to change. All conquered districts will increase power level speed. Player can perform certain orders to increase faction power level.

## Relocation

Relocation is the prestige. After relocating, almost everything will be lost. Certain favors allow to keep money, company members, their equipment and programs at a price. Each city has it's own price to relocate.

Relocation losses can be mitigated by getting favors, either by buying, capturing districts, performing missions or reaching certaing thresgolds of respect.

Relocation favors include

- Retaining money after relocations (10 tiers, each tier retain 10% more)
- Keep weapons (7 tiers, each tier will allow to keep weapons with quality not above it's corresponding tier)
- Keep armors (7 tiers, each tier will allow to keep armors with quality not above it's corresponding tier)
- Keep utility items (7 tiers, each tier will allow to keep items with quality not above it's corresponding tier)
- Keep additional company members (10 tiers, each tier allow to keep 1 more)
- Keep programs (7 tiers, each tier will allow to keep programs with quality not above it's corresponding tier)

Augmentations and blueprints are not affected by relocation.

## Orders

Each 10 minutes each district may have receive new orders. Order searching is affected by certain side jobs.

If order has hacking or combat, it is time limited instead of time walled. Failure to finish in time will result in instant defensive operation.

Company member can be assigned two types of orders: completable orders are will yield result after finishing them and side jobs will yield as member works on it, possibly with side effects. Completable orders will be finished first, if there is no completables, company member will work on their side job. Only one side job and one completable is available for each company member. Assigning new side job/completable will result in cancelling previous one.

Side jobs, contracts and missions are capped for each district, type and quality. Amount of actions available depends on type, district and faction multipliers.

### Side jobs

Side jobs are basic orders. There are no limits on available side jobs for any district. Player can assign one company member to perform it. Some side jobs can provide side effects, such as: increasing probabilty of getting new side jobs and contracts in region, increasing probability of getting new mercenaries in region, increasing reputation and money rewards, scanning for potential threats, developing equipment or augmentations.

Side jobs don't have time limit, always depend on one performer, have lowest requirements and will give rewards immediately, without time walling. They may have useful side effects. On other hand, side jobs have weakest multipliers. They are useful mostly in the beginning of game and as a support.

Quality increases requirements and gains. Faction specific side jobs will have it's faction multipliers applied.

### Contracts

Main way to gain resources. Each district has it's own set of counters for each contract type of each quality. Each 10 minutes districts can receive new random contracts. If district has contract available, player can assign multiple company members to perform it. Contracts have maximal caps.

Unlike side jobs, contracts require some time, combat or hacking to be finished first and can be done one time only. Contracts are unlocked after reaching some respect milestone.

Quality increases requirements and gains. Contracts can reward player with items that have level same as city and quality same as contract. Another possible reward is blueprint. Faction specific contracts will have it's faction multipliers applied.

### Missions

Missions can be offensive and defensive.

Offensive missions are issued to you by joined faction and can affect global state. Player can get mission at random points. After that, player can assemble a team to perform the work. Missions work like contracts, but once mission objective is done, they cannot be retried. Missions can expire. Missions may require up to 10 members and are unlocked in specific cities. Missions can have enemy factions assigned.

Defensive missions can be received every 10 minutes for each captured district, depending on it's wanted level. Higher the wanted level, higher the chances and difficulty of the mission. Initially defensive missions are not accessible, can be viewed only as warning and require specific program or sidejob to be performed in district. Failure to finish defensive mission in time can result in company member death, money loss, etc.

Quality increases gains and requirements. Total amount of missions available at same time for same district is capped. Some actions can make missions disappear. Faction and, if assigned, enemy faction will apply both their respective multipliers to requirements. Missions usually can be done in multiple ways. Mission diffuculty scales with development level.

Missions allow feats such as:

- Raid enemy territory. Will not capture it, but will increase power level and resources. If it's captured before mission is finished, mission will be cancelled. Will give favors
- Capturing enemy territory with assist of player. Same as above, but will capture territory and will give favors
- Raiding enemy faction HQ for money, items, favors and blueprints. Only one mission can be succeeded for each quality level and for each enemy faction HQ. Possibly not time-gated and completing one will lead to another for same enemy HQ with higher quality. Will give favors

#### Defensive mission types

##### Hunting party

Hunting party will damage one of player company member.

##### Raid

Raid will reduce player money and some items from inventory will be lost.

##### Defamation

Defamation will reduce player respect.

##### Assault

Assault will target player faction and reduce it's power level.

##### Slander

Slander will reduce district mulitpliers for all districts.

##### Poaching

Poaching will reduce amount of orders and mercenaries available in all districts.

##### Revolt

Revolt will remove control of random conquered district so player have to capture it again.

### Healing

Healing will give one company member regeneration bonus and disable them for some time until company member is healed. Has to be paid fully before starting.

### Augmentation

Augmentation will install augmentations in selected company member. After installing augmentations, company member will be in recovery for sum of every augmentation recovery time. During recovery, company member is disabled and cannot be assigned to work. Augmentation won't be started unless it can be paid fully.

### Re-equipment

Re-equipment will change equipment for selected company member. It will change their inventory instantly and will disable company member for short time.

### Applying booster

Applying booster will apply booster for selected company member. It will add them status effect instantly and will disable company member for short time.

### Training

Training will increase skill or attribute by one depending on which training program is used for selected company member. For each increase, price will increase exponentially. Training won't be started unless it can be paid fully. In addition, each increase require small amount of time. Depending on facility quality, limit for training can be increased.

## Combat

Specific orders require combat to finish. These orders have selected company members opposing enemy boss. Each second turn occurs, during which next person will perform their turn. Order of persons performing depends on their initiative. Once enemy boss have their HP 0 or lower, combat is passed. After that, order will checked if it's requirements are still passable. If yes, then order is completed. Company members and enemy bosses both can use debuffs on their first respective turn or heal once by using items in utility slots.

Enemy boss depends on faction of district.

Combat is performed automatically. When each person has it's turn, they will attack random enemy.

To prevent combat from dragging, it also has time limit.

Combat is unlocked at some point. Combat contracts and missions can be cancelled. Cancelling or failing combat can result in damaging assigned company members and depends on quality.

### Debuffs

#### Explosive

Deals damage. Affected by defense. May hit multiple times.

#### Flashbang/smoke grenade

Reduces critical rate, precision and dodge.

#### Corrosion

Reduces regeneration and defense.

### Healing

If company member has medkit, they can heal themselves during ther turn. Medkit will give fixed amount of HP depending on quality.

### Shield

If company member has shield, they have chance to draw enemy fire on themselves during enemy selection.

## Mainframe

Mainframe is used to run processes for owned programs. Mainframe has three parameters:

- Level increases perfomance of running programs
- RAM allows to run more and larger programs
- Cores allow to run more programs simultaneously

Only one program of each type can be owned at any time. Purchasing or writing new one will replace old one. Mainframe is available from the beginning of the game.

## Programs

Programs allow to perform some actions automatically without player input. Program can be written by company member or by specific program, program level can be selected, or purchased in hacking shops. Program level is capped by development level. Programs also have quality and higher quality leads to more time to write.

Only few programs are available initially. Player starts with program to generate other programs and with blueprint to get money program of lowest quality.

To prevent wasting resources, special program can be purchased/made to generate money depending on unused RAM/cores.

Examples of programs:

- Share server, for passive money generation. Will use unused RAM and cores. Mainframe level will increase rewards.
- Share client, for passive increase of other processes speed. Will use unused RAM and cores. Cannot be ran at same time with share server.
- Code generator, for automatically completing programs in development.
- Info searching programs, for increasing info search points in particular district.
- Threat investigation programs, for automatically discovering type of defensive mission.
- Automatic action assignment, to automatically heal, augment, equip or assign contract.
- Hacking programs.

## Hacking

Specific orders require hacking to finish. Hacking requires filling completion scale within time limit and avoid filling alert scale while hacking program is active.

Hacking is unavailable initially, unlocking it requires finishing respect milestone in specific city. Failing or cancelling hacking mission may trigger defensive mission.

# Content

## Cities

Cities have upper limit on development level unless noted. Each city also has different starting of power level sum, divided by factions, allowing them to have some territory during map generation. Each city save highest achieved development level, speeding up the progress on subsequent runs.
Each city has it's own rewards for neutral faction.

### Starting city

Starting city has only one faction - **Global security service**. Player begins here after starting the game. Has small size and designed to learn how to use basic mechanics.

Has following unlocks:

- Mainframe
- Sidejobs
- Contracts
- Combat
- Factions
- Relocation

### Proving grounds

Proving grounds has 4 random factions and a lot of regions. Unlike most other cities, Proving grounds has no cap on development level.

### Science city

Science city has two factions: **Gamma security** and random. It has large number of training facilities.

Completing science city will reward player with higher unlocked starting quality of training facilities. Maximum 6 levels are available.

### Smuggler's city

Smuggler's city has two factions: **placeholder** and random.

Completing smuggler's city will increase starting quality cap of weapons to purchase. Maximum 6 levels are available.

### Cyborg city

Cyborg city has two factions: **Steelmen** and random.

Completing cyborg city will increase starting quality of augmentations. Maximum 6 levels are available.

### Junkie's city

Junkie's city has two factions: **placeholder** and random.

Completing junkie's city will increase starting quality of boosters and utility items. Maximum 6 levels are available.

### Slums

Slums has three-four factions - **Jackals** and random. Size is medium. Designed to be a tutorial for advanced mechanics.

Has following unlocks:

- Wanted level and crimes
- Defensive missions

### Android city

Android city has multiple factions. Size is medium.

Has following unlocks:

- Orders automation

### Hacking city

Hacking city has multiple factions. Size is medium. Completing hacking city will increase starting quality of programs.

### Combat zone

Combat zone is hard level, with 3-4 random or criminal factions. Completing development levels here unlocks retaining acquired programs, equipment, company members etc.

## Districts

## Factions

### Vigil

#### Items

Shield

#### Favors

Vigil can increase level of all new defensive equipment without increasing requirements.

#### Mercenaries

Defense oriented, with ranged weapons
