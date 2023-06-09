/* eslint-disable consistent-return */
// import yellow from 'chalk';
import { JHipsterClientGenerator } from 'generator-jhipster/generators/client';
import { writeFiles as writeReactFiles } from './files-react';
// prettier-ignore
import { askForClient as _askForClient, askForClientTheme as _askForClientTheme, askForClientSideOpts as _askForClientSideOpts } from './prompts';

export default class extends JHipsterClientGenerator {
    constructor(args, opts) {
        super(args, { fromBlueprint: true, ...opts }); // fromBlueprint variable is important

        const jhContext = (this.jhipsterContext = this.options.jhipsterContext);

        // if (!jhContext) {
        //     this.error(`This is a JHipster blueprint and should be used only like ${yellow('jhipster --blueprint helloworld')}`);
        // }

        this.configOptions = jhContext.configOptions || {};

        // This sets up options for this sub generator and is being reused from JHipster
        jhContext.setupClientOptions(this, jhContext);
    }

    get initializing() {
        /**
         * Any method beginning with _ can be reused from the superclass `ClientGenerator`
         *
         * There are multiple ways to customize a phase from JHipster.
         *
         * 1. Let JHipster handle a phase, blueprint doesnt override anything.
         * ```
         *      return super._initializing();
         * ```
         *
         * 2. Override the entire phase, this is when the blueprint takes control of a phase
         * ```
         *      return {
         *          myCustomInitPhaseStep() {
         *              // Do all your stuff here
         *          },
         *          myAnotherCustomInitPhaseStep(){
         *              // Do all your stuff here
         *          }
         *      };
         * ```
         *
         * 3. Partially override a phase, this is when the blueprint gets the phase from JHipster and customizes it.
         * ```
         *      const phaseFromJHipster = super._initializing();
         *      const myCustomPhaseSteps = {
         *          displayLogo() {
         *              // override the displayLogo method from the _initializing phase of JHipster
         *          },
         *          myCustomInitPhaseStep() {
         *              // Do all your stuff here
         *          },
         *      }
         *      return Object.assign(phaseFromJHipster, myCustomPhaseSteps);
         * ```
         */
        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._initializing();
    }

    get prompting() {
        // The prompting phase is being overriden so that we can ask our own questions
        return {
            askForClient: _askForClient,
            askForClientTheme: _askForClientTheme,
            askForClientSideOpts: _askForClientSideOpts,

            setSharedConfigOptions() {
                this.configOptions.lastQuestion = this.currentQuestion;
                this.configOptions.totalQuestions = this.totalQuestions;
                this.configOptions.clientFramework = this.clientFramework;
                this.configOptions.useSass = this.useSass;
            },
        };
        // If the prompts need to be overriden then use the code commented out above instead

        // Here we are not overriding this phase and hence its being handled by JHipster
        // return super._prompting();
    }

    get configuring() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._configuring();
    }

    get default() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._default();
    }

    get writing() {
        // The writing phase is being overriden so that we can write our own templates as well.
        // If the templates doesnt need to be overrriden then just return `super._writing()` here
        /*
        return {
            writeAdditionalFile() {
                writeReactFiles.call(this);
            }
        };
        */
        const phaseFromJHipster = super._writing();
        const customPhaseSteps = {
            writeAdditionalFile() {
                writeReactFiles.call(this);
            },
        };
        return Object.assign(phaseFromJHipster, customPhaseSteps);
    }

    get install() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._install();
    }

    get end() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._end();
    }
}
