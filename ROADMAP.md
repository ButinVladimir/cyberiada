# Description

Cyberiada is an idle cyberpunk-themed management game inspired by Bitburner. In this game player control mainframe and team of up to 10 members by giving them various orders to perform. Company can travel between cities, representing different scenarios, which have different conditions and unique rewards.

# Terms

## Money

Money is a resource which can be spend on performing various actions such as hiring new company members, buying equipment, boosters and augmentations etc.

## Development points

Development points are main resource in the game. It show how much progress is done in particaluar city. Unlocking equipment, boosters, augmentations, works, contracts, operations etc. requires reaching certain levels of respect.

## Development level

Development level shows how developed player is. Higher development levels allow purchasing items with higher level and unlocks new sidejobs and contracts. Development level increases after reaching certain development points thresholds. Most cities have upper limit on development level. After relocating development level is reset. Each city has it's own development level factors.

## Favors

Favors are faction-specific currency. Favors are earned by completing operations, capturing more districts, by increasing development level, by hacking or can be bought by money. Favors can be spent on purchasing faction designs, negating prestige effects, decreasing prices or using faction specific perks.

## Qualities and difficulties

Various objects have different quality or difficulty. It's marked as number from I to VII.

## Company

Game revolves around managing company. Company members are managed by giving them orders.

Moving to another city will result in losing current company but certain favors allow to retain company members.

## Company member

Each company member has their own set of attributes, skills, equipment and augmentations. Certain actions can incapacitate them. Depending on quality, company members have different starting equipment, augmentations, attributes and skills. Attributes, skills and equipment of newhires depend on level which is capped by current development level. Each district may unlock new company member template as reward for capturing it.

Company members to be hired are generated depending on templates. There are templates for each faction and for neutral.

## Stats

### Level

Each company member has their own level. Level requirements do not depend on current city or development level and are exponential. Reaching new level gives company member one attribute and one skill points.

### Experience

To get new levels, company members must reach certain thresholds of experience. Experience gain can be increased by increasing intellect and using certain items.

### Shock

Shock accumulates when member is incapacitated or receives a new augmentation. Installing augmentation gives some amount of shock for each. Incapacitation maxes shock out. Shock will gradually decrease over 1 hour if member is alive and restored. Until shock reaches 0, member is unable to participate in combat. Shock will also decrease attributes and skills linearly. Max amount of shock depends on endurance.

### HP

HP indicates how much damage can company member take. When HP reaches 0 or lower, company member is incapacitated and all actions related to them are cancelled. Incapacitated company members have to be paid to be restored manually or by program. After restoration, member shock is maxed out.

Can be increased by certain items and endurance. After finished each combat contract or operation, HP is restored immediately.

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

### Diplomacy

Diplomacy gives additional money and respect bonuses and gives discount to hiring mercenaries and looking for new contracts.

## Training programs

Training programs are alternative to leveling mercenary. It allows to buy skills and attributes. It's max level is capped, depending on development level and program quality. There are training programs for each skill and attribute, attribute programs are unlocked initially, skill programs has to be earned as reward from capturing districts.

## Equipment

Each company member has three different equipment slots: weapon, armor and utility. Weapon equipment deals damage, armor provides defense and utility gives buffs or debuffs. Each equipment item has level and quality. Higher the level or quality, higher the requirements and stats. Equipment can be changed only between contracts. Equipment can be bought from weapon shop. Capturing districts can unlock more equipment types.

Equipped items will be lost after moving to another city unless specific favors are earned.

Unlocked in specific city after joining certain faction.

## Augmentations

Augmentations are another way to buff company members. Like equipment, each augmentation has level and quality, which affect requirements and stats. Augmentation is not free, each augmentation costs money and adds shock which prevents from participating in combat.

Each company member has following augmentations slots:

- Skin
- Nerve system
- Eyes
- Head
- Torso
- Arms
- Legs

Augmentations are not affected by moving to another city.

Unlocked in specific city after joining certain faction.

## Designs

Designs allow creating programs and equipment without relying on faction and . Level of resulting item is capped by development level. Quality can be selected. Getting designs for same item increases max quality with what item can be crafted. Designs can be bought by favors or captured by hacking or in operations.

## City

Each city is described as rectangular map, composed of cells. City is divided into districts. Each district can reward player with additional item to buy. In addition, each district has it's own set of multipliers, depending on district template and scenario multipliers. Some districts may contrain player or faction HQs.

Each city district has it's own set of contract counters. In addition, each district has connection, computational base and tech base points which provide bonuses and discounts in this district.

### Districts

Each district has it's own set of multipliers. These multipliers increase chance of getting contract, increase reputation and money rewards, decrease cost of buying items and mercenaries. These multipliers can be increased by specific actions and are retained. However, spending more on these multipliers will result in diminishing returns.

Player can use contracts and bonuses from district without capturing it if district contains player HQ or belongs to the player selected faction. Initial amount of points in district is 0 which means that there will be no discounts. Player can increase points for selected district.
Each 10 minutes new batch of contracts will be generated, maximum 1 contract for each district, contract type and quality.

After generating city, for each district will be assigned faction for combat. If it's same as player faction, neutral faction will be used.

Each district has reward for capturing it for player selected faction. This rewards can unlock new equipment, company hires, training programs, etc.

### Factions

Each city has it's own set factions that try to claim city for themself. Player can join one faction if development level requirements are met. Once faction is joined, player cannot leave it unless they relocate.

Each factions has it's own starting power level, affecting initial distribution of districts.

Faction specific equipment and augmentations can be obtained by capturing districts or getting designs. Each faction have one or more perks which can be purchased by favors.

Each faction has it's own set of requirement modifiers, affecting operations and contracts.

### Turf war

Turf war allows factions capture districts depending on current faction power level. Capturing opposing faction HQ unlocks operations to raid it.

Capturing districts allows company to perform activities here and will affect speed of changing power level.

Requirements to capture will increase with each owned distict. Player can assist their selected faction by increase it's power level.

When map is generated, district are split between neutral forces and factions. After joining faction, player will start increasing it's power level by performing actions.

## Relocation

Relocation is the prestige. After relocating, almost everything will be lost. Certain favors allow to keep money, company members, their equipment and programs at a price. Each city has it's own price to relocate.

Relocation losses can be mitigated by getting favors, either by buying, capturing districts, performing operations or reaching certaing thresholds of respect.

Relocation favors include

- Retaining money after relocations (10 tiers, each tier retain 10% more)
- Keep weapons (7 tiers, each tier will allow to keep weapons with quality not above it's corresponding tier)
- Keep armors (7 tiers, each tier will allow to keep armors with quality not above it's corresponding tier)
- Keep utility items (7 tiers, each tier will allow to keep items with quality not above it's corresponding tier)
- Keep additional company members (10 tiers, each tier allow to keep 1 more)
- Keep programs (7 tiers, each tier will allow to keep programs with quality not above it's corresponding tier)

Augmentations and designs are not affected by relocation.

## Orders

Company member can be assigned two types of orders: completable orders are will yield result after finishing them and side jobs will yield as member works on it, possibly with side effects. Completable orders will be finished first, if there is no completables, company member will work on their side job. Only one side job and one completable is available for each company member. Assigning new side job/completable will result in cancelling previous one.

Contracts and operations are capped for each district, contracts have separated caps for various types and qualities. Amount of actions available depends on type, district and faction multipliers.

### Side jobs

Side jobs are basic orders. There are no limits on available side jobs for any district. Player can assign one company member to perform it. Some side jobs can increase certain points, such as connections for better rewards and discounts for hiring mercenaries and getting new contracts, tech base for better discounts on augmentations and equipment, connection base for discount on mainframe hardware and programs.

Side jobs don't have time limit, always depend on one performer, have lowest requirements and will give rewards immediately, without time walling. They may have useful side effects. On other hand, side jobs have weakest multipliers. They are useful mostly in the beginning of game and as a support.

Quality increases requirements and gains. Each quality also has it's own required minimal development level.

### Contracts

Main way to gain resources. Each district has it's own set of counters for each contract type of each quality. Each 10 minutes districts can receive new random contracts. If district has contract available, player can assign multiple company members to perform it. Contracts have maximal caps.

Unlike side jobs, contracts require some time. Contracts are unlocked after joining faction in starting city and can be done only after joining faction. Each faction has it's own set of contracts and multipliers for contracts.

Quality increases requirements and gains.

Each 10 minutes each district may have receive new contracts.

### Operations

Operations are issued to you by joined faction and can affect global state. Player can get operation at random points. After that, player can assemble a team to perform the work. Operations work like contracts, but once operation objective is done, they cannot be retried. Operations are unlocked in specific cities. Operations can have enemy factions assigned.

Quality increases gains and requirements. Total amount of operations available at same time for same district is capped. Some actions can make operations disappear. Faction and, if assigned, enemy faction will apply both their respective multipliers to requirements. Operations usually can be done in multiple ways. Operation diffuculty scales with development level.

Operations allow feats such as:

- Raid enemy territory. Will not capture it, but will increase power level and resources. If it's captured before operation is finished, operation will be cancelled. Will give favors
- Capturing enemy territory with assist of player. Same as above, but will capture territory and will give favors
- Raiding enemy faction HQ for money, favors and designs. Only one operation can be succeeded for each quality level and for each enemy faction HQ. Possibly not time-gated and completing one will lead to another for same enemy HQ with higher quality. Will give favors

## Combat

Specific orders require combat to finish. These orders have selected company members opposing enemy boss. Each second turn occurs, during which next person will perform their turn. Order of persons performing depends on their initiative. Once enemy boss have their HP 0 or lower, combat is passed. Operations in addition may require certain skills and attributes like contracts. Company members and enemy bosses both can use debuffs on their first respective turn or heal once by using items in utility slots.

Enemy boss depends on faction of district.

Combat is performed automatically. Enemy boss will retaliate after each turn.

To prevent combat from dragging, damage cannot be negated completely for both sides.

Combat is unlocked at some point. Combat contracts and operations can be cancelled but won't be compensated.

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

Programs allow to perform some actions automatically without player input. Program must be bought, program level and quality can be selected. Program level is capped by development level. Higher quality leads to higher requirements. Computational base for each district and for programs will affect mainframe products discount.

Only few programs are available initially. Player starts with program and design to share mainframe to get some money and development points.

To prevent wasting resources, special program can be purchased/made to generate money depending on unused RAM/cores.

Examples of programs:

- Share server, for passive money generation. Will use unused RAM and cores. Mainframe level will increase rewards.
- Predictive computator, for passive increase of other processes speed. Will use unused RAM and cores. Cannot be ran at same time with share server.
- Code generator, for generating computational base points.
- Info searching programs, for generating connectivity points.
- Automatic action assignment, to assign contracts and operations, it will act as looping queue.
- Hacking programs.

## Hacking

Hacking is done only by mainframe. Each district has it's own server, hacking it will yield money and, possibly, designs (only for enemy factions, first time only). Faction servers cannot be hacked until faction is joined.

Hacking requires filling completion scale and avoid filling alert scale while hacking is active.

Hacking is unavailable initially, unlocking it requires finishing respect milestone in specific city.

# Content

## Cities

Cities have upper limit on development level unless noted. Each city also has different starting of power level sum, divided by factions, allowing them to have some territory during map generation. Each city save highest achieved development level, speeding up the progress on subsequent runs.
Each city has it's own rewards for neutral faction.

### Starting city

Starting city has only one faction - **Global security agency**. Player begins here after starting the game. Has small size and designed to learn how to use basic mechanics.

Has following unlocks:

- Mainframe
- Sidejobs
- Contracts
- Factions
- Relocation

### Proving grounds

Proving grounds has 4 random factions and a lot of regions. Unlike most other cities, Proving grounds has no cap on development level.

### Science city

Science city has two factions: **Gamma security** and **Steelmen**. It has large number of training facilities.

Completing science city will reward player with unlocking factions. Maximum 6 levels are available.

### Smuggler's city

Smuggler's city has two factions: **placeholder** and random.

Completing smuggler's city will increase starting quality cap of weapons to purchase. Maximum 6 levels are available.

### Slums

Slums has three-four factions - **Jackals** and **Militia**. Size is medium. Designed to be a tutorial .

Has following unlocks:

- Wanted level and crimes, which will increase level, requirements and rewards of almost all orders.
- Combat

### Android city

Android city has multiple factions. Size is medium.

Has following unlocks:

- Mainframe automation
- Hacking

### Combat zone

Combat zone is hard level, with 3-4 random or criminal factions. Completing development levels here unlocks retaining acquired programs, equipment, company members etc and starting with better equipment unlocked.

## Districts

## Factions

### Vigil

#### Items

Shield

#### Favors

Vigil can increase level of all new defensive equipment without increasing requirements.

#### Mercenaries

Defense oriented, with ranged weapons
