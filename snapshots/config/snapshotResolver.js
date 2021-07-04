module.exports = {
    resolveSnapshotPath: (testPath, snapshotExtension) => {
        return testPath.replace('src/', 'snapshots/__snapshots__/') + snapshotExtension
    },
    resolveTestPath: (snapshotFilePath, snapshotExtension) => {
        return snapshotFilePath
            .replace('snapshots/__snapshots__/', 'src/')
            .slice(0, -snapshotExtension.length)
    },
    testPathForConsistencyCheck: 'some/example.test.js',
}
