function getAppTheme(theme:any) {
    return {
        main: {

            backgroundColor:
                theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
    }
}

export default getAppTheme;