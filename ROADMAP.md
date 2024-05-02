# Description

Cyberiada is an idle cyberpunk-themed RPG inspired by Bitburner. In this game player control crew of up to 10 members by giving them various orders to perform. Crew can travel between different cities which have different conditions and unique rewards.

# Terms

## Money

Money is a resource which can be spend on performing various actions such as hiring new crew members, buying equipment, boosters and augmentations etc.

## Respect

Respect is a main resource in the game. It show how much progress is done in particaluar city. Unlocking equipment, boosters, augmentations, works, contracts, missions etc. requires reaching certain levels of respect.

## Wanted level

Wanted level reflects how often crew will receive retaliations. It also multiplies respect and experience gains.

Unavailable in beginning, can be unlocked in specific city.

## Difficulty level

Each city has it's own difficulty level. Higher difficulty levels leads to higher requirements but also allows to purchase items with higher level. Difficulty level increases after reaching certain respect thresholds. Most cities have upper limit on difficulty level. After relocating difficulty level is reset. Each city has it's own starting difficulty level and difficulty level factor.

## Favors

Favors are faction-specific currency. Favors are earned by completing missions, capturing more districts, by increasing respect or can be bought. Favors can be spent on purchasing faction blueprints, crew members, equipments, augmentations, negating prestige effects, decreasing prices or using faction specific perks.

## Qualities

Various objects have different quality. Currently available qualities:
- Common
- Uncommon
- Rare
- Superb
- Awesome
- Excellent
- Perfect

## Crew

Game revolves around managing crew. Crew members is managed by giving them orders.

Moving to another city will result in losing current crew but certain favors allow to retain crew members.

If all crew members are lost, game will restart in same city but previously unlocked features will remain unlocked, most of inventory lost and respect level reset.

## Crew member

Each crew member has their own set of attributes, skills, equipment and augmentations. They can be boosted by boosters. Certain actions can kill them. To hire new crew members, special actions should be perform to find and hire new one with money. Depending on quality, crew members have different starting equipment, augmentations, attributes and skills. Attributes and skills of newhires depend on difficulty level.

Crew members to be hired are generated depending on templates. There are templates for each faction and for neutral. Faction specific crew members require favor to purchase in addition to money and respect.

## Stats

### Level

Each crew member has their own level. Level requirements do not depend on current city or difficulty level and are exponential. Reacing new level gives crew member one attribute and one skill points.

### Experience

To get new levels, crew members must reach certain thresholds of experience. Experience gain can be increased by increasing intellect and using certain items.

### HP

HP indicates how much damage can crew member take. If HP reaches 0 or lower, crew member dies, to be removed from crew and all actions related to him are cancelled. Can be increased by certain items and endurance.

If crew member is not engaged in combat or hacking order, they can be healed for some amount of money.

### Damage

Damage is used in combat. Each time someone receives a hit, damage is selected from certain range, reduced by opponent defense and then applied. Damage depends on equipment. Melee equpment damage depends on strength.

### Critical rate

Each time damage is dealt, it may deal critical hit. Critical rate indicates how often these critical hits happen. Critical rate bonuses depend on equipped weapon, attributes and skills.

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

This parameters affects how fast crew member HP will regenerate.

### Experience bonus

This parameter affects how fast crew member gets experience.

### Initiative

This parameter affects how soon crew member can have their turn in combat.

## Attributes

### Strength

Strength is used mostly in weapon requirements and for damage bonuses for melee weapons.

### Endurance

Endurance affects crew member HP and how fast augmentations can be installed in them.

### Perception

Perception is used in determining whether opponent is hit or not. It's another usage is for critical rate bonuses.

### Agility

Agility is used for dodging attacks and increasing hits number in combat.

### Intellect

Intellect affects how much experience crew member gets after completing orders. It also used in weapon requirements, for decreasing search requirements.

### Charisma

Charisma gives bonuses related to money and respect.

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

Each crew member has three different equipment slots: weapon, armor and utility. Weapon equipment deals damage, armor provides defense and utility gives buffs or debuffs. Each equipment item has level and quality. Higher the level or quality, higher the requirements and stats. Changing equipment is not free - it results in short action which will override current member action and cannot be cancellable. Equipment can be bought from weapon shop, be crafted or earned by performing missions and contracts. Equipments can be made by crafting, capturing district for neutral items and weapon shops for faction or by performing contracts and missions.

Equipment will be lost after moving to another city unless specific favors are earned.

Unlocked in starting town at some point.

## Augmentations

Augmentations are another way to buff crew members. Like equipment, each augmentation has level and quality, which affect requirements and stats. Augmentation is not free, each augmentation has time wall to install which can be reduced by endurance.

Each crew member has following augmentations slots:
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

Crafting blueprints allows crafting equipment or boosters. Level of resulting item is determined by difficulty level. Quality can be selected and will affect crafting time, but having crafting level above difficulty level will decrease it. Getting blueprints for same item increases max quality with what item can be crafted.

Crafting rectipes are unlocked in specific city by repeated runs.

## City

Each city is described as square map of 100x100 cells. City is divided into districts. Each district can have own set of equipments available for purchase. In addition, each district has it's own set of multipliers, depending on district template and scenario multipliers. Some districts may contrain player or faction HQs.

Each city has it's own line of rewards, each reward requires increasing difficulty level. Player can achieve multiple rewards in same run.

Each city district has it's own set of contract and hire counters.

### Facilities

Each faction in scenario has it's own line of facilities. Capturing more districts in the city will lead to increasing amount of available facilities or items. For example, capturing 3 districts means first 3 rewards are available. These facilities can be: Weapon shop, pharmacy, hospitals, training facilities, hacking shops and probably more. Rewarded items depend on faction.

Weapon shop, pharmacy, hospitals, training facilities and hacking shops have quality. Shops can sell items limited by quality. Training facilities can increase skill or attribute to level depending on difficulty level and quality. Quality can be increased by purchasing certain faction favor.

Training facilities can increase only one selected attribute or skill. Skill or attribute for training facilities and faction items for other facilities depend on faction.

In addition, districts also reward specific neutral items after capturing it. Rewards are randomized during map generation. Each district can have maximum one of such item.

### Districts

Each district has it's own set of multipliers. These multipliers increase chance of getting contract, increase change of getting mercenary available, increase reputation and money rewards. These multipliers can be increased by specific side jobs and are retained. However, spending more on these multipliers will result in diminishing returns.

When district is captured, it will receive maximal amount of contracts for each contract type and each quality. However, initial chances to get new mercenary or contract are 0. Player must perform specific actions to increase these chances.

After generating city, for each district will be assigned faction for combat. If it's same as player faction, neutral faction will be used.

### Factions

Each city has it's own set factions that try to claim city for themself. Player can join one faction if difficulty level requirements are met. Once faction is joined, player cannot leave it unless they relocate.

Each factions has it's own predetermined power level speed, affecting power level of joined faction.

Faction specific equipment, boosters and augmentations can be obtained by capturing districts, getting blueprints or performing contracts and missions. Each faction have one or more perks which can be purchased by favors.

Each faction has it's own set of requirement modifiers, affecting missions and related side jobs and contracts. 

### Turf war

Turf war allows factions capture districts depending on faction power level. Depending on what has been captured, faction will receive different bonuses:

- Capturing opposing faction HQ unlocks missions to raid it
- Capturing player HQ gives ability to instantly perform mercenary search by spending money
- Capturing faction HQ gives ability to instantly perform contracts and sidejob search by spending money

Each faction has it's own line of training programs, equipments and augmentations. When game starts, this line is randomized. Capturing districts will make more rewards from this line available.

Capturing districts allows crew to perform activities here, buy mercenaries from here and will affect speed of changing power level.

Requirements to capture will increase with each owned distict. Player can assist their selected faction by increase it's power level.

When map is generated, district are split between neutral forces and factions. After joining faction, it's power level starts to change. All conquered districts will increase power level speed. Player can perform certain orders to increase faction power level.

## Relocation

Relocation is the prestige. After relocating, almost everything will be lost. Certain favors allow to keep money, crew members, their equipment and programs at a price.

Relocation losses can be mitigated by getting favors, either by buying, capturing districts, performing missions or reaching certaing thresgolds of respect.

Relocation favors include
- Retaining money after relocations (10 tiers, each tier retain 10% more)
- Keep weapons
- Keep armors
- Keep utility item
- Keep additional crew members (10 tiers, each tier allow to keep 1 more)
- Keep certaing types of program

Augmentations and blueprints are not affected by relocation.

## Orders

Each minute each district may have receive new orders. Order searching is affected by certain side jobs.

If order has hacking or combat, it is time limited instead of time walled. Failure to finish in time will result in loss of respect, orders or money and may trigger retaliation.

Crew member can be assigned two types of orders: completable orders are will yield result after finishing them and side jobs will yield as member works on it, possibly with side effects. Completable orders will be finished first, if there is no completables, crew member will work on their side job. Only one side job and one completable is available for each crew member. Assigning new side job/completable will result in cancelling previous one.

Side jobs, contracts and missions are capped for each district, type and quality. Amount of actions available depends on type, district and faction multipliers.

### Side jobs

Side jobs are basic orders. There are no limits on available side jobs for any district. Player can assign one crew member to perform it. Some side jobs can provide side effects, such as: increasing probabilty of getting new side jobs and contracts in region, increasing probability of getting new mercenaries in region, increasing reputation and money rewards.

Side jobs don't have time limit, always depend on one performer, have lowest requirements and will give rewards immediately, without time walling. They may have useful side effects. On other hand, side jobs have weakest multipliers. They are useful mostly in the beginning of game and as a support.

Quality increases requirements and gains. Faction specific side jobs will have it's faction multipliers applied.

### Contracts

Main way to gain resources. Each district has it's own set of counters for each contract type of each quality. Each minute districts can receive new random contracts. If district has contract available, player can assign multiple crew members to perform it. Contracts have maximal caps.

Unlike side jobs, contracts require some time, combat or hacking to be finished first and can be done one time only. Contracts are unlocked after reaching some respect milestone.

Quality increases requirements and gains. Contracts can reward player with items that have level same as city and quality same as contract. Another possible reward is blueprint. Faction specific contracts will have it's faction multipliers applied.

### Missions

Missions are issued to you by joined faction, can affect global state and can reward you with factions. You can get mission at random points. After that, team perform the work. Missions work like contracts, but once mission objective is done, they cannot be retried. Missions can expire. Missions may require up to 10 members and are unlocked in specific cities. Missions can have enemy factions assigned.

Quality increases gains and requirements. Total amount of missions available at same time is capped. Some actions can make missions disappear. Faction and, if assigned, enemy faction will apply both their respective multipliers to requirements. Missions usually can be done in multiple ways.

Missions allow feats such as:
- Retaliations. Won't give favors
- Raid enemy territory. Will not capture it, but will increase power level and resources. If it's captured before mission is finished, mission will be cancelled. Will give favors
- Capturing enemy territory with assist of player. Same as above, but will capture territory and will give favors
- Raiding enemy faction HQ for money, items, favors and blueprints. Only one mission can be succeeded for each quality level and for each enemy faction HQ. Possibly not time-gated and completing one will lead to another for same enemy HQ with higher quality. Will give favors

#### Retaliations

Retaliations are unique two-staged missions. Retaliations can have different quality, requiring different stats to locate it. 
First stage is to find out, what type of retaliation is. After this is found out, next stage is to deal with it. Failing to finish retaliation mission in time will result in one of actions below.

Increasing wanted level will result in retaliations appear on it's own increasingly often and with increasing level. Retaliations cannot have lever lower than current difficulty level.

Completing normal missions will result in retaliation.

##### Hunting party

Hunting party will damage one of player crew member.

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

Healing will give one crew member regeneration bonus and disable them for some time until crew member is healed. Has to be paid fully before starting.

### Augmentation

Augmentation will install augmentations in selected crew member. After installing augmentations, crew member will be in recovery for sum of every augmentation recovery time. During recovery, crew member is disabled and cannot be assigned to work. Augmentation won't be started unless it can be paid fully.

### Re-equipment

Re-equipment will change equipment for selected crew member. It will change their inventory instantly and will disable crew member for short time.

### Applying booster

Applying booster will apply booster for selected crew member. It will add them status effect instantly and will disable crew member for short time.

### Training

Training will increase skill or attribute by one depending on which training program is used for selected crew member. For each increase, price will increase exponentially. Training won't be started unless it can be paid fully. In addition, each increase require small amount of time. Depending on facility quality, limit for training can be increased.

### Writing program

Writing program will create program with selected quality. Time to create program depends on quality, hacking level and difficulty level.

## Combat

Specific orders require combat to finish. These orders have selected crew members opposing randomly generated mercenaries. Each second turn occurs, during which next person will perform their turn. Order of persons performing depends on their initiative. Once all enemy mercenaries have their HP 0 or lower, combat is passed. After that, order will checked if it's requirements are still passable. If yes, then order is completed. Combat allows finishing orders faster at cost of potential crew loss. Crew members and enemiees both can use debuffs on their first respective turn or heal once by using items in utility slots.

Composition of enemy team depends on faction district. Combat in missions will have increased amount of faction specific mercenaries.

Combat is performed automatically. When each person has it's turn, they will attack their selected enemy. If there is no selected enemy or they died already, they will select new one randomly.

To prevent combat from dragging, it also has time limit.

Combat is unlocked at some point. Combat contracts and missions can be cancelled. Cancelling or failing combat can result in damaging assigned crew members, damage will ignore armor and depends on quality.

### Debuffs

#### Explosive

Deals damage. Affected by defense. May hit multiple times.

#### Flashbang/smoke grenade

Reduces critical rate, precision and dodge.

#### Corrosion

Reduces regeneration and defense.

### Healing

If crew member has medkit, they can heal themselves during ther turn. Medkit will give fixed amount of HP depending on quality.

### Shield

If crew member has shield, they have chance to draw enemy fire on themselves during enemy selection.

## Server

Player can purchase or write server for running programs. Server has three parameters:

- Level increases perfomance of running programs. Programs with level below difficulty level won't work
- RAM allows to run more and larger programs
- Cores allow to run more programs simultaneously

Server is unavailable initially, unlocking it requires finishing specific city. Only one program of each type can be owned at any time. Purchasing or writing new one will replace old one.

## Programs

Programs allow to perform some actions automatically without player input. Program can be written by crew member, program level depends on crew member hacking level, or purchased in hacking shops. Programs also have quality and higher quality leads to time to write.

Programs are unavailable initially, unlocking them requires finishing specific city.

To prevent wasting resources, special program can be purchased/made to generate money depending on unused RAM/cores.

Examples of programs:
- Spoofing programs, for passive money generation. Will use unused RAM and cores. Server level will increase rewards
- Side contract searching programs, for increasing search multiplier in particular district
- Crew member searching programs, for increasing search multiplier in particular district
- Retaliation prevention programs, for automatically discovering type of retaliation
- Automatic contract assignment, for specified team of crew members, district and selected contract types and qualities. Each selected contract type and quality will require more cores
- Automatic healing assignment. Quality doesn't matter. Assigned for one crew member only
- Automatic equipment assignment. Will try to replace crew member equipment with one with higher level or quality. Equipment can be purchased or crafted by other member. Can use only items with quality same or lower as program. By default will try to use items from inventory. Higher qualities and more slots lead to higher core requirements
- Automatic augmentation assigment. Similar to above

## Hacking

Specific orders require hacking to finish. Hacking requires filling completion scale within time limit and avoid filling alert scale while hacking program is active.

Hacking is unavailable initially, unlocking it requires finishing respect milestone in specific city. Failing or cancelling hacking mission may trigger retaliation.

# Content

## Cities

Cities have upper limit on difficulty level unless noted. Each city also has different starting of power level sum, divided by factions, allowing them to have some territory during map generation.

### Starting city

Starting city has only one faction - **Vigil**. Player begins here after starting the game. Has small size and designed to learn how to use basic mechanics.

Has following unlocks:
- Contracts
- Relocation

### Proving grounds

Proving grounds has 4 random factions and a lot of regions. Unlike most other cities, City of Dreams has no cap on difficulty level and saves highest achieved difficulty level here. Entering Proving Grounds again will automatically level up crew members to this level.

### Science city

Science city has two factions: **Gamma security** and random. Training facilities of max quality are available here from the start. It has large number of training facilities.

Completing science city will reward player with higher starting quality of training facilities. Maximum 6 levels are available.

### Smuggler's city

Smuggler's city has two factions: **placeholder** and random. Crew members here can be hired with equipment of max quality and arms shops are available immediately with max quality.

Completing smuggler's city will increase starting quality cap of equipment to purchase. Maximum 6 levels are available.

### Cyborg city

Cyborg city has two factions: **placeholder** and random. Crew members here can be hired with augmentations of max quality and hospitals are available immediately with max quality.

Completing cyborg city will increase starting quality of hospitals. Maximum 6 levels are available.

### Junkie's city

Junkie's city has two factions: **placeholder** and random. Pharmacies are available immediately with max quality. Player crew can use multiple boosters at same time.

Completin junkie's city will reward player with ability to use more side effects, up to 3, and increase stating quality of pharmacies.

### Combat zone

Combat zone has three-four factions - **Vigil**, **Mongrels** and **placeholder**. Size is medium. Designed to be a tutorial for advanced mechanics.

Has following unlocks:
- Combat
- Wanted level and crimes
- Missions and retailations

### Hacking city

Hacking city has multiple factions. Size is medium.

Has following unlocks:
- Server (money spoofing program is default)
- Hacking orders
- Different types of programs and automation
- Higher starting quality of hacking shops

## Districts

## Factions

### Vigil

#### Items

Shield

#### Favors

Vigil can make every search result in guaranteed success. That means for specific favor quality each time search occurs, it will result in generating contrats and mercenaries with same or below quality with 100% chance.

#### Mercenaries

Defense oriented, with ranged weapons
