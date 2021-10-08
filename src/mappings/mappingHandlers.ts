import {ActiveEraInfo, Balance, EraIndex, Exposure as ExposureType, Nominations } from "@polkadot/types/interfaces";
import {Option, StorageKey} from "@polkadot/types"
import {SubstrateEvent} from "@subql/types";
import {Era} from "../types/models/Era";
import {Exposure} from "../types/models/Exposure";
import {Nominator} from "../types/models/Nominator";
import {ValidatorSet} from "../types/models/ValidatorSet";
// import geolite2 from "geolite2-redist";
// import maxmind from "maxmind";
// import Promise from "bluebird";
// import dns from "dns";


export async function handleBlock({ block }: SubstrateEvent): Promise<void> {
    // in the early stage of kusama, staking.activeEra didn't exist
    if (!api.query.staking.activeEra) return;
    const [activeEra] = await api.queryMulti<[Option<ActiveEraInfo>, Option<EraIndex>]>([
        api.query.staking.activeEra,
    ]);
    if (activeEra.isEmpty) return;



// sample query
//     {
//   query {
//     exposures (first: 1)  {
//       nodes {
//         id 
//         nominators { nodes { id } }
//       }
//     }
//   }
// }

    // const dnsLookupAsync = Promise.promisify(dns.lookup);

    // await geolite2.downloadDbs();
    // const ASNLookup: any = await geolite2.open('GeoLite2-ASN', path => maxmind.open(path));
    // const ContryLookup: any = await geolite2.open('GeoLite2-Country', path => maxmind.open(path));
    // const testIp: any = await dnsLookupAsync("polkawatch.app");
    // const testASN: any = ASNLookup.get(testIp);
    // console.log('HAVE ASN NUMBER ', testASN.autonomous_system_number === 8473 );
    // const testCountry = ContryLookup.get(testIp);
    // console.log('HAVE ASN COUNRY ', testCountry.country.iso_code === 'SE' );
    // ASNLookup.close();
    // ContryLookup.close();






    // instantiate Era type and add some values
    const entityEra = new Era(activeEra.unwrap().index.toString());
    entityEra.startBlock = block.block.header.number.toNumber();
    entityEra.timestamp = block.timestamp;

    // instantiate ValidatorSet type and add some values
    const entityValidatorSet = new ValidatorSet(activeEra.unwrap().index.toString());
    entityValidatorSet.totalValidators = (await api.query.session.validators()).length
    const validatorsRaw = await api.query.session.validators();
    // const validators = validatorsRaw.toHuman(); <- type conflict AnyJson .. 
    const validators = [];
    validatorsRaw.forEach(function(elem) {
       validators.push(elem.toString());
    });
    entityValidatorSet.validatorList = validators;

    // create realtionships & save
    // entityEra.validatorSetId = entityValidatorSet.id;
    entityValidatorSet.eraId = entityEra.id;
    await entityEra.save();
    await entityValidatorSet.save();

    // instantiate Exposure type & Nominator type and add values
    await validators.forEach(async function(validator) {
        const entityExposure = new Exposure(validator);
        const stakingExposureRaw = await api.query.staking.erasStakers<ExposureType>(activeEra.unwrap().index, validator);
        const validatorTotalStake = stakingExposureRaw.total.toString();
        const validatorOwnStake = stakingExposureRaw.own.toString();
        entityExposure.total = validatorTotalStake;
        entityExposure.own = validatorOwnStake;
        await entityExposure.save();
        stakingExposureRaw.others.forEach(function(nominator){
            const entityNominator = new Nominator(nominator.who.toString());
            entityNominator.value = nominator.value.toString();
            // cerate relations and save
            entityNominator.exposureId = entityExposure.id;
            entityNominator.save();
        });

    });
    



    
}



// function extractNominators (nominations: [StorageKey, Option<Nominations>][]): any {
//   return nominations.reduce((mapped: any, [key, optNoms]) => {
//     if (optNoms.isSome && key.args.length) {
//       const nominatorId = key.args[0].toString();
//       const { submittedIn, targets } = optNoms.unwrap();

//       targets.forEach((_validatorId, index): void => {
//         const validatorId = _validatorId.toString();
//         // const info = { index: index + 1, nominatorId, submittedIn };
//         const info = nominatorId.toString();

//         if (!mapped[validatorId]) {
//           mapped[validatorId] = [info];
//         } else {
//           mapped[validatorId].push(info);
//         }
//       });
//     }

//     return mapped;
//   }, {});
// }

    // const 

    // const nominations = await api.query.staking.nominators.entries();
    // const nominatorMap = extractNominators(nominations);
    // const test = JSON.stringify(nominatorMap);
    // const nominators = {};
    // array.forEach(function (item, index) {
    //     const validatorKey = item[0][0].toString();
    //     const nominatorSet = item[1].targets;
    //     nominators[validatorKey] = nominatorSet;
    // });


        // entityEra.totalStaked = (await api.query.staking.erasTotalStake(activeEra.unwrap().index)).toBigInt();
        // entityEra.totalValidators = validators.length;
        // entityEra.validatorList = vals;
        // entityEra.validatorWithLeastBond = thresholdValidator.accountId;
        // entityEra.leastStaked = thresholdValidator.total.toBigInt();
        // entityEra.maxNominatorRewardedPerValidator = api.consts.staking.maxNominatorRewardedPerValidator?.toNumber();


    //         const exposureInfos = await api.query.staking.erasStakers.multi<ExposureType>(validators.map(validator=>[activeEra.unwrap().index, validator]));
    // const thresholdValidator = exposureInfos.reduce<{accountId: string, total: Balance}>((acc, exposure, idx)=>{
    //     if (!acc || exposure.total.unwrap().lt(acc.total)) {
    //         return {accountId: validators[idx].toString(), total: exposure.total.unwrap()};
    //     }
    //     return acc;
    // }, undefined );







