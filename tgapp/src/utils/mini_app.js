export const initTGMiniApp = {
  Options: {
    /**
     * True if the SDK should accept styles sent from the Telegram
     * application.
     * @default true
     */
    acceptCustomStyles: true,

    /**
     * The maximum supported Mini Apps version.
     * @default Extracted using the `retrieveLaunchParams`
     * function.
     * @see retrieveLaunchParams
     */
    version: retrieveLaunchParams(),

    /**
     * Custom postEvent function.
     *
     * Passing the "strict" value creates a function that always
     * checks if the specified call is supported by the current Mini
     * Apps version. If the method is unsupported, an error
     * will be thrown.
     *
     * Passing the "non-strict" value creates a postEvent function
     * that doesn't throw errors but warns about missing method
     * support.
     *
     * @default 'strict'
     * @see createPostEvent
     */
    postEvent: 'strict'
  }
};