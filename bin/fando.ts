import { Command } from 'commander';
import { server } from '../lib';

const program = new Command();

program
    .command('dev')
    .description('Start a development server')
    .action(async () => {
        await server({ type: 'dev' });
    });

program
    .command('build')
    .description('Building for production')
    .action(async () => {
        await server({ type: 'build' });
    });

program.parse(process.argv);
