require 'rake'

ROOT_DIR          = File.expand_path(File.dirname(__FILE__))
LIB_SRC_DIR       = File.join(ROOT_DIR, 'src')
LIB_DIST_DIR      = File.join(ROOT_DIR, 'build')
LIB_TEST_DIR      = File.join(ROOT_DIR, 'tests')
LIB_TEST_UNIT_DIR = File.join(LIB_TEST_DIR, 'cases')
LIB_TMP_DIR       = File.join(ROOT_DIR, 'tmp')

require File.join(ROOT_DIR, 'vendors', 'sprockets', 'lib', 'sprockets')
require File.join(ROOT_DIR, 'vendors', 'unittest_js', 'lib', 'unittest_js')

task :default => [:test]

task :pdl do
    puts ENV['TESTS']
end

def sprocketize(source, destination = source)
    begin
        require "sprockets"
    rescue LoadError => e
        puts "\nYou'll need Sprockets to build subetha. Just run:\n\n"
        puts "  $ git submodule init"
        puts "  $ git submodule update"
        puts "\nand you should be all set.\n\n"
    end

    secretary = Sprockets::Secretary.new(
        :root         => LIB_SRC_DIR,
        :load_path    => [LIB_SRC_DIR],
        :source_files => [source]
    )

    secretary.concatenation.save_to(File.join(LIB_DIST_DIR, destination))
end

desc "Build the distribution."
task :dist do
    sprocketize('template.js', 'subetha.js')
end

desc "Clean the distribution."
task :dist_clean do
    rm_rf File.join(LIB_DIST_DIR, 'subetha.js')
end

task :test => [ 'test:build', 'test:run' ]
namespace :test do
    task :require do
        begin
            require "unittest_js"
        rescue LoadError => e
            puts "\nYou'll need UnittestJS to run the Learndo.Lib tests. Just run:\n\n"
            puts "  $ git submodule init"
            puts "  $ git submodule update"
            puts "\nand you should be all set.\n\n"
        end
    end

    desc 'Runs all the JavaScript unit tests and collects the results'
    task :run => [ :require ] do
        testcases        = ENV['TESTCASES']
        browsers_to_test = ENV['BROWSERS'] && ENV['BROWSERS'].split(',')
        tests_to_run     = ENV['TESTS'] && ENV['TESTS'].split(',')
        runner = UnittestJS::WEBrickRunner::Runner.new(:test_dir => LIB_TMP_DIR)

        Dir[File.join(LIB_TMP_DIR, '*_test.html')].each do |file|
            file = File.basename(file)
            test = file.sub('_test.html', '')
            unless tests_to_run && !tests_to_run.include?(test)
                runner.add_test(file, testcases)
            end
        end


        (browsers_to_test || UnittestJS::Browser::SUPPORTED).each do |browser|
            runner.add_browser(browser.to_sym)
        end

        trap('INT') { runner.teardown; exit }
        runner.run
    end

    task :clean => [ :require ] do
        UnittestJS::Builder.empty_dir!(LIB_TMP_DIR)
    end

    task :build => [ :clean, :dist ] do
        builder = UnittestJS::Builder::SuiteBuilder.new({
            :input_dir     => LIB_TEST_UNIT_DIR,
            :assets_dir    => LIB_DIST_DIR,
            :output_dir    => LIB_TMP_DIR,
            :templates_dir => File.join(LIB_TEST_DIR, 'templates'),
            :fixtures_dir  => File.join(LIB_TEST_DIR, 'fixtures')
        })
        selected_tests = (ENV['TESTS'] || '').split(',')
        builder.collect(*selected_tests)
        builder.render
    end
end
