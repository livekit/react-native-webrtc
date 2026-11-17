package io.livekit.reactnative.webrtc;

import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

final class ThreadUtils {
    private static volatile Thread executorThread;

    /**
     * Thread which will be used to call all WebRTC PeerConnection APIs. They
     * they don't run on the calling thread anyway, we are deferring the calls
     * to this thread to avoid (potentially) blocking the calling thread.
     */
    private static final ExecutorService executor = Executors.newSingleThreadExecutor(runnable -> {
        // Also called if the worker thread is ever replaced, which keeps executorThread current.
        Thread thread = Executors.defaultThreadFactory().newThread(runnable);
        executorThread = thread;
        return thread;
    });

    /**
     * Whether the current thread is the executor's thread.
     * @return true when called from a task running on the executor.
     */
    public static boolean isOnExecutor() {
        return Thread.currentThread() == executorThread;
    }

    /**
     * Gets the executor used to run all WebRTC PeerConnection APIs.
     * @return ExecutorService.
     */
    public static ExecutorService getExecutor() {
        return executor;
    }

    /**
     * Runs the given {@link Runnable} on the executor.
     * @param runnable
     */
    public static void runOnExecutor(Runnable runnable) {
        executor.execute(runnable);
    }

    /**
     * Submits the given {@link Callable} to be run on the executor.
     * @param callable
     * @return Future.
     */
    public static <T> Future<T> submitToExecutor(Callable<T> callable) {
        return executor.submit(callable);
    }

    /**
     * Submits the given {@link Runnable} to be run on the executor.
     * @param runnable
     * @return Future.
     */
    public static Future<?> submitToExecutor(Runnable runnable) {
        return executor.submit(runnable);
    }
}
